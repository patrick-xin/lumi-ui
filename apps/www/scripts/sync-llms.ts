import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

interface RegistryItem {
  name: string;
  title?: string;
  description?: string;
  type: string;
}

interface RegistryFile {
  items: RegistryItem[];
}

interface CategoryMeta {
  title: string;
  pages?: string[];
}

interface DocFrontmatter {
  title?: string;
  description?: string;
}

interface ExistingEntry {
  title: string;
  description?: string;
}

interface ExistingComponentState {
  entries: Map<string, ExistingEntry>;
  orderByCategory: Map<string, string[]>;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_DIR = path.resolve(__dirname, "..");
const DOCS_COMPONENTS_DIR = path.join(APP_DIR, "content/docs/components");
const REGISTRY_FILE_PATH = path.join(APP_DIR, "registry.json");
const LLMS_FILE_PATH = path.join(APP_DIR, "public/llms.txt");
const DOC_BASE_URL = "https://lumiui.dev/docs/components";

function toSentenceCase(value: string): string {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(" ");
}

function stripWrappedQuotes(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

async function readJson<T>(filePath: string): Promise<T> {
  const content = await fs.readFile(filePath, "utf8");
  return JSON.parse(content) as T;
}

async function parseDocFrontmatter(filePath: string): Promise<DocFrontmatter> {
  const content = await fs.readFile(filePath, "utf8");
  if (!content.startsWith("---")) {
    return {};
  }

  const parts = content.split("---");
  if (parts.length < 3) {
    return {};
  }

  const frontmatterBlock = parts[1];
  const lines = frontmatterBlock.split("\n");
  const result: DocFrontmatter = {};

  for (const line of lines) {
    const match = line.match(/^([a-zA-Z0-9_-]+):\s*(.+)$/);
    if (!match) continue;

    const key = match[1];
    const rawValue = stripWrappedQuotes(match[2]);

    if (key === "title") {
      result.title = rawValue;
    } else if (key === "description") {
      result.description = rawValue;
    }
  }

  return result;
}

function getComponentsSectionBounds(lines: string[]): {
  startIndex: number;
  themesIndex: number;
} {
  const startIndex = lines.findIndex((line) =>
    line.startsWith("## Components: "),
  );
  const themesIndex = lines.findIndex((line) => line.trim() === "## Themes");

  if (startIndex === -1) {
    throw new Error("Could not find a components section in llms.txt");
  }

  if (themesIndex === -1 || themesIndex <= startIndex) {
    throw new Error(
      "Could not find the ## Themes boundary after components section",
    );
  }

  return { startIndex, themesIndex };
}

function parseExistingEntries(llmsContent: string): ExistingComponentState {
  const lines = llmsContent.split("\n");
  const { startIndex, themesIndex } = getComponentsSectionBounds(lines);
  const componentsLines = lines.slice(startIndex, themesIndex);
  const entryMap = new Map<string, ExistingEntry>();
  const orderByCategory = new Map<string, string[]>();
  let currentCategory: string | null = null;

  for (const line of componentsLines) {
    const headingMatch = line.match(/^## Components: (.+)$/);
    if (headingMatch?.[1]) {
      currentCategory = headingMatch[1];
      if (!orderByCategory.has(currentCategory)) {
        orderByCategory.set(currentCategory, []);
      }
      continue;
    }

    const match = line.match(/^- \[(.+?)\]\((https?:\/\/[^)]+)\)(?:: (.+))?$/);
    if (!match) continue;

    const title = match[1].trim();
    const url = match[2].trim();
    const description = match[3]?.trim();

    entryMap.set(url, {
      description,
      title,
    });

    if (currentCategory) {
      const order = orderByCategory.get(currentCategory) ?? [];
      order.push(url);
      orderByCategory.set(currentCategory, order);
    }
  }

  return {
    entries: entryMap,
    orderByCategory,
  };
}

function orderSlugs(slugs: string[], preferredOrder: string[]): string[] {
  const unique = Array.from(new Set(slugs));
  const preferred = preferredOrder.filter(
    (item) => item !== "..." && unique.includes(item),
  );
  const preferredSet = new Set(preferred);
  const remaining = unique
    .filter((item) => !preferredSet.has(item))
    .sort((a, b) => a.localeCompare(b));

  return [...preferred, ...remaining];
}

async function generateComponentSections(
  existingState: ExistingComponentState,
): Promise<string> {
  const registry = await readJson<RegistryFile>(REGISTRY_FILE_PATH);
  const registryMap = new Map(
    registry.items.map((item) => [item.name, item] as const),
  );

  const rootMeta = await readJson<CategoryMeta>(
    path.join(DOCS_COMPONENTS_DIR, "meta.json"),
  );
  const categorySlugs = rootMeta.pages ?? [];

  const sections: string[] = [];

  for (const categorySlug of categorySlugs) {
    const categoryDir = path.join(DOCS_COMPONENTS_DIR, categorySlug);
    const categoryMetaPath = path.join(categoryDir, "meta.json");
    const categoryMeta = await readJson<CategoryMeta>(categoryMetaPath);

    const files = await fs.readdir(categoryDir, { withFileTypes: true });
    const englishMdxSlugs = files
      .filter(
        (entry) =>
          entry.isFile() &&
          entry.name.endsWith(".mdx") &&
          !entry.name.endsWith(".cn.mdx"),
      )
      .map((entry) => entry.name.replace(/\.mdx$/, ""));

    const orderedSlugs = orderSlugs(englishMdxSlugs, categoryMeta.pages ?? []);
    const rows: Array<{ url: string; title: string; description: string }> = [];

    for (const slug of orderedSlugs) {
      const mdxPath = path.join(categoryDir, `${slug}.mdx`);
      const frontmatter = await parseDocFrontmatter(mdxPath);
      const registryItem = registryMap.get(slug);
      const url = `${DOC_BASE_URL}/${categorySlug}/${slug}`;
      const existingEntry = existingState.entries.get(url);

      const title =
        existingEntry?.title ??
        registryItem?.title ??
        frontmatter.title ??
        toSentenceCase(slug);
      const description =
        existingEntry?.description ??
        registryItem?.description ??
        frontmatter.description ??
        "";

      rows.push({ description, title, url });
    }

    const existingOrder =
      existingState.orderByCategory.get(categoryMeta.title) ?? [];
    const rowMap = new Map(rows.map((row) => [row.url, row] as const));
    const orderedRows: Array<{
      url: string;
      title: string;
      description: string;
    }> = [];

    for (const url of existingOrder) {
      const row = rowMap.get(url);
      if (!row) continue;
      orderedRows.push(row);
      rowMap.delete(url);
    }

    for (const row of rows) {
      if (!rowMap.has(row.url)) continue;
      orderedRows.push(row);
      rowMap.delete(row.url);
    }

    const lines = orderedRows.map(
      (row) =>
        `- [${row.title}](${row.url})${row.description ? `: ${row.description}` : ""}`,
    );

    sections.push(`## Components: ${categoryMeta.title}\n${lines.join("\n")}`);
  }

  return sections.join("\n\n");
}

function syncComponentsBlock(
  llmsContent: string,
  componentsBlock: string,
): string {
  const lines = llmsContent.split("\n");
  const { startIndex, themesIndex } = getComponentsSectionBounds(lines);

  const before = lines.slice(0, startIndex).join("\n").replace(/\s*$/, "");
  const after = lines.slice(themesIndex).join("\n").replace(/\s*$/, "");

  return `${before}\n\n${componentsBlock}\n\n${after}\n`;
}

async function main(): Promise<void> {
  const llmsContent = await fs.readFile(LLMS_FILE_PATH, "utf8");
  const existingState = parseExistingEntries(llmsContent);
  const componentsBlock = await generateComponentSections(existingState);

  const nextContent = syncComponentsBlock(llmsContent, componentsBlock);
  await fs.writeFile(LLMS_FILE_PATH, nextContent, "utf8");

  const componentCount = componentsBlock
    .split("\n")
    .filter((line) => line.startsWith("- [")).length;

  console.log(`Updated ${LLMS_FILE_PATH}`);
  console.log(`Synced ${componentCount} component links`);
}

void main().catch((error) => {
  console.error("Failed to sync llms.txt:", error);
  process.exit(1);
});
