import fs from "node:fs/promises";
import path from "node:path";
import type { InferPageType } from "fumadocs-core/source";
import { rewriteRegistryImports } from "@/lib/rewrite-imports";
import type { source } from "@/lib/source";
import { components } from "@/registry/__index__";
import type { RegistryName } from "@/registry/__registry";

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText("processed");

  const seenComponents = new Set<string>();

  let output = `---
title: ${page.data.title}
description: ${page.data.description}
${page.data.links ? `Doc link: ${page.data.links.doc}` : ``}
${page.data.links ? `API link: ${page.data.links.api}` : ``}
Page URL: ${page.url}
---\n\n`;

  const componentName = extractComponentName(page);

  if (componentName && componentName in components) {
    const sourceCode = await getComponentSourceCode(componentName);
    if (sourceCode) {
      output += `## Component Source Code\n\n\`\`\`tsx\n${sourceCode}\n\`\`\`\n\n`;
      seenComponents.add(componentName);
    }
  }

  output += await processContent(processed, seenComponents);

  return output;
}

async function processContent(
  content: string,
  seenComponents: Set<string>,
): Promise<string> {
  const componentPreviewRegex = /<ComponentPreview[^>]+name="([^"]+)"[^>]*\/>/g;
  const matches = [...content.matchAll(componentPreviewRegex)];
  let result = content;

  for (const match of matches) {
    const [fullTag, name] = match;
    const componentName = name as RegistryName;

    if (componentName in components) {
      if (seenComponents.has(componentName)) {
        const replacement = `${fullTag}\n\n<!-- Code for ${componentName} is defined above -->\n`;
        result = result.replace(fullTag, replacement);
        continue;
      }

      const demoCode = await getComponentSourceCode(componentName);

      if (demoCode) {
        const replacement = `${fullTag}\n\n\`\`\`tsx\n${demoCode}\n\`\`\`\n`;
        result = result.replace(fullTag, replacement);
        seenComponents.add(componentName);
      }
    }
  }

  return result;
}

function extractComponentName(
  page: InferPageType<typeof source>,
): RegistryName | null {
  const urlSegments = page.url.split("/");
  const lastSegment = urlSegments[urlSegments.length - 1];

  if (lastSegment && lastSegment in components) {
    return lastSegment as RegistryName;
  }

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
