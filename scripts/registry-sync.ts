import fs from "node:fs";
import path from "node:path";

interface RegistryItem {
  name: string;
  type: string;
  dependencies?: string[];
  files?: Array<{ path: string; type: string }>;
}

interface PublicRegistryItem {
  $schema: string;
  name: string;
  type: string;
  dependencies?: string[];
  files: Array<{
    path: string;
    content: string;
    type: string;
  }>;
}

interface Registry {
  $schema: string;
  name: string;
  homepage: string;
  items: RegistryItem[];
}

const PROJECT_ROOT = path.resolve(__dirname, "..");
const REGISTRY_JSON_PATH = path.join(PROJECT_ROOT, "registry.json");
const EXAMPLES_DIR = path.join(PROJECT_ROOT, "components/examples");
const PUBLIC_REGISTRY_DIR = path.join(PROJECT_ROOT, "public/r");
const REGISTRY_INDEX_PATH = path.join(PROJECT_ROOT, "registry/__index__.tsx");
const REGISTRY_TYPES_PATH = path.join(PROJECT_ROOT, "registry/__registry.d.ts");

function log(message: string) {
  console.log(`${message}`);
}

function readRegistryJson(): Registry {
  if (!fs.existsSync(REGISTRY_JSON_PATH)) {
    log(`Registry file not found: ${REGISTRY_JSON_PATH}`);
    process.exit(1);
  }

  try {
    const content = fs.readFileSync(REGISTRY_JSON_PATH, "utf-8");
    const parsed = JSON.parse(content) as Registry;

    if (!parsed.items || !Array.isArray(parsed.items)) {
      log(`Invalid registry format: missing or invalid items array`);
      process.exit(1);
    }

    return parsed;
  } catch (error) {
    log(`Failed to read registry.json: ${error}`);
    process.exit(1);
  }
}

function readPublicRegistryFiles(): Map<string, PublicRegistryItem> {
  const publicRegistry = new Map<string, PublicRegistryItem>();

  if (!fs.existsSync(PUBLIC_REGISTRY_DIR)) {
    log(`Public registry directory does not exist: ${PUBLIC_REGISTRY_DIR}`);
    return publicRegistry;
  }

  try {
    const files = fs
      .readdirSync(PUBLIC_REGISTRY_DIR)
      .filter((file) => file.endsWith(".json"));

    for (const file of files) {
      try {
        const filePath = path.join(PUBLIC_REGISTRY_DIR, file);
        const content = fs.readFileSync(filePath, "utf-8");
        const item = JSON.parse(content) as PublicRegistryItem;

        if (item.name) {
          publicRegistry.set(item.name, item);
        } else {
          log(`Invalid registry item in ${file}: missing name`);
        }
      } catch (error) {
        log(`Failed to read ${file}: ${error}`);
      }
    }
  } catch (error) {
    log(`Failed to read directory ${PUBLIC_REGISTRY_DIR}: ${error}`);
  }

  return publicRegistry;
}

function getExistingDemoFiles(): string[] {
  if (!fs.existsSync(EXAMPLES_DIR)) {
    log(`Examples directory does not exist: ${EXAMPLES_DIR}`);
    return [];
  }

  return fs
    .readdirSync(EXAMPLES_DIR)
    .filter((file) => file.endsWith(".tsx") && file.includes("-"))
    .map((file) => file.replace(".tsx", ""));
}

function validateRegistry(
  registry: Registry,
  demoFiles: string[],
): {
  warnings: string[];
  errors: string[];
  componentsWithDemos: string[];
} {
  const warnings: string[] = [];
  const errors: string[] = [];
  const componentsWithDemos: string[] = [];

  // Get all registry component names for cross-reference
  const registryComponentNames = registry.items.map((item) => item.name);

  // Check each registry item (skip non-UI components like registry:lib)
  for (const item of registry.items) {
    // Skip items that are not UI components (e.g., registry:lib, registry:hook)
    if (item.type !== "registry:ui") {
      continue;
    }

    // Find all demo files for this component (flexible naming)
    const componentDemos = demoFiles.filter(
      (demo) =>
        demo.startsWith(`${item.name}-`) || demo === `${item.name}-demo`,
    );

    if (componentDemos.length > 0) {
      componentsWithDemos.push(item.name);
    } else {
      warnings.push(
        `Component "${item.name}" is in registry.json but no demo files found. Expected: components/examples/${item.name}-*.tsx`,
      );
    }
  }

  // Check for orphaned demo files (more flexible matching)
  for (const demoFile of demoFiles) {
    // Extract potential component name (everything before the last hyphen)
    const parts = demoFile.split("-");
    if (parts.length < 2) continue;

    // Try different component name patterns
    let found = false;
    for (let i = parts.length - 1; i > 0; i--) {
      const potentialComponentName = parts.slice(0, i).join("-");
      if (registryComponentNames.includes(potentialComponentName)) {
        found = true;
        break;
      }
    }

    if (!found) {
      warnings.push(
        `Demo file "${demoFile}.tsx" doesn't match any component in registry.json`,
      );
    }
  }

  return { warnings, errors, componentsWithDemos };
}

function generateIndexFile(registry: Registry, demoFiles: string[]): string {
  const entries: string[] = [];

  // Generate UI component entries
  for (const item of registry.items) {
    const registryFiles =
      item.files?.map((file) => ({
        path: file.path,
        type: file.type,
        target: "",
      })) || [];

    let componentLazyLoad = "";
    if (item.type === "registry:ui" || item.type === "registry:lib") {
      const importPath =
        item.type === "registry:ui"
          ? `@/registry/ui/${item.name}`
          : `@/registry/lib/${item.name}`;

      componentLazyLoad = `component: React.lazy(async () => {
      const mod = await import("${importPath}");
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || "${item.name}";
      return { default: mod.default || mod[exportName] };
    }),`;
    }

    entries.push(`  "${item.name}": {
    name: "${item.name}",
    description: "",
    type: "${item.type}",
    registryDependencies: ${item.dependencies && item.dependencies.length > 0 && item.dependencies[0] !== "" ? JSON.stringify(item.dependencies) : "undefined"},
    files: ${JSON.stringify(registryFiles, null, 6).replace(/^/gm, "    ")},
    ${componentLazyLoad}
    categories: undefined,
    meta: undefined,
  }`);
  }

  // Generate demo/example entries
  for (const demoFile of demoFiles) {
    // Try to determine which component this demo is for
    const parts = demoFile.split("-");
    let registryDeps: string[] = [];

    // Look for matching component in registry
    for (let i = parts.length - 1; i > 0; i--) {
      const potentialComponentName = parts.slice(0, i).join("-");
      if (registry.items.some((item) => item.name === potentialComponentName)) {
        registryDeps = [potentialComponentName];
        break;
      }
    }

    entries.push(`  "${demoFile}": {
    name: "${demoFile}",
    description: "",
    type: "registry:example",
    registryDependencies: ${registryDeps.length > 0 ? JSON.stringify(registryDeps) : "undefined"},
    files: [{
      path: "components/examples/${demoFile}.tsx",
      type: "registry:example",
      target: ""
    }],
    component: React.lazy(async () => {
      const mod = await import("@/components/examples/${demoFile}");
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || "${demoFile}";
      return { default: mod.default || mod[exportName] };
    }),
    categories: undefined,
    meta: undefined,
  }`);
  }

  return `/* eslint-disable @typescript-eslint/ban-ts-comment */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  // @ts-nocheck
  // This file is autogenerated by scripts/build-registry.ts
  // Do not edit this file directly.

import React from "react";
import type { ComponentRegistry } from "./__registry";

export const components: ComponentRegistry = {
${entries.join(",\n")}
};
`;
}

function generateTypesFile(registry: Registry, demoFiles: string[]): string {
  // Generate union type of all registry names (components + demos)
  const componentNames = registry.items.map((item) => `"${item.name}"`);
  const demoNames = demoFiles.map((demo) => `"${demo}"`);
  const allNames = [...componentNames, ...demoNames].join(" | ");

  return `import type React from "react";

/**
 * Registry of all components and examples
 * Auto-generated by scripts/registry-sync.ts
 * DO NOT EDIT MANUALLY
 */
export type RegistryName = ${allNames || "never"};

export interface RegistryFile {
  path: string;
  type: string;
  target?: string;
}

export interface RegistryEntry {
  name: string;
  description?: string;
  type: "registry:ui" | "registry:example" | "registry:lib" | "registry:hook";
  registryDependencies?: string[];
  files: RegistryFile[];
  component?: React.LazyExoticComponent<React.ComponentType<unknown>>;
  categories?: string[];
  meta?: Record<string, unknown>;
}

export type ComponentRegistry = Record<RegistryName, RegistryEntry>;

// Backward compatibility types
export type ComponentName = RegistryName;
export interface ComponentEntry extends RegistryEntry {
  component: React.LazyExoticComponent<React.ComponentType<unknown>>;
  src: string;
}
`;
}

function main() {
  log("\n Registry Sync - Validation Mode\n");

  // Step 1: Read registry.json
  log("Reading registry.json...");
  const registry = readRegistryJson();
  log(`Found ${registry.items.length} components in registry.json`);

  // Step 2: Read public registry files (for validation only)
  log("\n Reading public registry files...");
  const publicRegistry = readPublicRegistryFiles();
  log(`Found ${publicRegistry.size} public registry files`);

  // Step 3: Scan for demo files
  log("\n Scanning for demo files...");
  const demoFiles = getExistingDemoFiles();
  log(`Found ${demoFiles.length} demo files`);

  // Step 4: Validate
  log("\n Validating...");
  const { warnings, errors, componentsWithDemos } = validateRegistry(
    registry,
    demoFiles,
  );

  // Display results
  if (errors.length > 0) {
    log("\n Errors:");
    for (const error of errors) {
      log(`  • ${error}`);
    }
  }

  if (warnings.length > 0) {
    log("\n  Warnings:");
    for (const warning of warnings) {
      log(`  • ${warning}`);
    }
  }

  if (errors.length === 0 && warnings.length === 0) {
    log("\n All validations passed!");
  }

  // Step 5: Generate type definitions
  log("\n Generating type definitions...");
  const typesContent = generateTypesFile(registry, demoFiles);

  try {
    fs.writeFileSync(REGISTRY_TYPES_PATH, typesContent, "utf-8");
    log(`Generated ${REGISTRY_TYPES_PATH}`);
    log(
      `Added types for ${registry.items.length} components and ${demoFiles.length} demos`,
    );
  } catch (error) {
    log(`Failed to write __registry.d.ts: ${error}`);
    process.exit(1);
  }

  // Step 6: Generate __index__.tsx
  log("\n Generating registry/__index__.tsx...");
  const indexContent = generateIndexFile(registry, demoFiles);

  try {
    fs.writeFileSync(REGISTRY_INDEX_PATH, indexContent, "utf-8");
    log(`Generated ${REGISTRY_INDEX_PATH}`);
    log(
      `Added ${registry.items.length} components and ${demoFiles.length} demos`,
    );
  } catch (error) {
    log(`Failed to write __index__.tsx: ${error}`);
    process.exit(1);
  }

  // Summary
  const uiComponents = registry.items.filter(
    (item) => item.type === "registry:ui",
  );
  log("\n Summary:");
  log(`  Registry UI components: ${uiComponents.length}`);
  log(`  Demo files found: ${demoFiles.length}`);
  log(`  Components with demos: ${componentsWithDemos.length}`);
  log(`  Warnings: ${warnings.length}`);
  log(`  Errors: ${errors.length}`);

  if (errors.length > 0) {
    log("\n Sync completed with errors");
    process.exit(1);
  } else if (warnings.length > 0) {
    log("\n  Sync completed with warnings");
  } else {
    log("\n Sync completed successfully!");
  }
}

main();
