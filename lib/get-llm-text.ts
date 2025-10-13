import fs from "node:fs/promises";
import path from "node:path";
import type { InferPageType } from "fumadocs-core/source";
import { rewriteRegistryImports } from "@/lib/rewrite-imports";
import type { source } from "@/lib/source";
import { components } from "@/registry/__index__";
import type { RegistryName } from "@/registry/__registry";

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText("processed");
  let output = `# ${page.data.title} (${page.url})\n\n${processed}`;

  // Extract component name from page slug or title
  const componentName = extractComponentName(page);

  if (componentName && componentName in components) {
    const sourceCode = await getComponentSourceCode(componentName);
    const demoCode = await getDemoCode(componentName);

    if (sourceCode) {
      output += `\n\n## Source Code\n\n\`\`\`tsx\n${sourceCode}\n\`\`\``;
    }

    if (demoCode) {
      output += `\n\n## Demo Code\n\n\`\`\`tsx\n${demoCode}\n\`\`\``;
    }
  }

  return output;
}

function extractComponentName(
  page: InferPageType<typeof source>,
): RegistryName | null {
  // Try to extract component name from URL path
  const urlSegments = page.url.split("/");
  const lastSegment = urlSegments[urlSegments.length - 1];

  // Check if it's a valid component name
  if (lastSegment && lastSegment in components) {
    return lastSegment as RegistryName;
  }

  // Try to extract from title
  const titleLower = page.data.title?.toLowerCase();
  if (titleLower && titleLower in components) {
    return titleLower as RegistryName;
  }

  return null;
}

async function getComponentSourceCode(
  componentName: RegistryName,
): Promise<string | null> {
  try {
    const component = components[componentName];
    if (!component?.files?.[0]?.path) {
      return null;
    }

    const filePath = path.join(process.cwd(), component.files[0].path);
    const originalCode = await fs.readFile(filePath, "utf-8");
    return rewriteRegistryImports(originalCode);
  } catch (error) {
    console.error(`Failed to read source code for ${componentName}:`, error);
    return null;
  }
}

async function getDemoCode(
  componentName: RegistryName,
): Promise<string | null> {
  try {
    // Look for demo files that match the component name
    const demoName = `${componentName}-demo` as RegistryName;

    if (demoName in components) {
      const demoComponent = components[demoName];
      if (demoComponent?.files?.[0]?.path) {
        const filePath = path.join(process.cwd(), demoComponent.files[0].path);
        const demoCode = await fs.readFile(filePath, "utf-8");
        return rewriteRegistryImports(demoCode);
      }
    }

    return null;
  } catch (error) {
    console.error(`Failed to read demo code for ${componentName}:`, error);
    return null;
  }
}
