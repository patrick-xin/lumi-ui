import fs from "fs";
import path from "path";
import { components } from "@/registry/__index__";
import type { RegistryEntry, RegistryFile } from "@/registry/__registry";
import type { Block, BlockFile, TreeNode } from "@/types";
import { rewriteRegistryImports } from "./rewrite-imports";

// Get the monorepo root directory reliably
const getMonorepoRoot = () => {
  const currentDir = process.cwd();

  // If we're in apps/www, go up two levels
  if (currentDir.endsWith("apps/www") || currentDir.endsWith("apps\\www")) {
    return path.resolve(currentDir, "../..");
  }

  // If we're already at the root (has both apps and packages folders)
  const appsDir = path.join(currentDir, "apps");
  const packagesDir = path.join(currentDir, "packages");
  if (fs.existsSync(appsDir) && fs.existsSync(packagesDir)) {
    return currentDir;
  }

  // Fallback: assume we need to go up two levels
  return path.resolve(currentDir, "../..");
};

const MONOREPO_ROOT = getMonorepoRoot();

export async function getRegistryItem(block: RegistryEntry): Promise<Block> {
  const files = await Promise.all(
    block.files.map(async (file: RegistryFile) => {
      // Resolve file path relative to monorepo root
      let filePath: string;

      if (file.path.startsWith("@lumi-ui/ui/")) {
        // Handle @lumi-ui/ui/ imports
        filePath = path.resolve(
          MONOREPO_ROOT,
          file.path.replace("@lumi-ui/ui/", "packages/ui/src/"),
        );
      } else if (file.path.startsWith("../../packages/ui/src/")) {
        // Handle relative paths from registry - remove the ../../ and resolve from monorepo root
        filePath = path.resolve(MONOREPO_ROOT, file.path.replace("../../", ""));
      } else {
        // Default resolution from monorepo root
        filePath = path.resolve(MONOREPO_ROOT, file.path);
      }

      let content = "";

      try {
        content = fs.readFileSync(filePath, "utf-8");
      } catch (e) {
        console.error(`Failed to read file ${filePath}`, e);
        console.error(`Original file.path: ${file.path}`);
        console.error(`Monorepo root: ${MONOREPO_ROOT}`);
      }

      // Determine relative path for target if not present
      const blockName = block.name;
      const parts = file.path.split(`/${blockName}/`);
      let target = file.target;
      if (!target && parts.length > 1) {
        target = parts[1];
      }
      if (!target) {
        target = path.basename(file.path);
      }

      // Rewrite imports for display (e.g., @lumi-ui/ui/ -> @/components/ui/)
      const displayContent = rewriteRegistryImports(content);

      return {
        content: displayContent,
        path: file.path,
        target,
        type: file.type,
      } satisfies BlockFile;
    }),
  );

  return {
    categories: block.categories,
    description: block.description,
    files,
    meta: block.meta,
    name: block.name,
    registryDependencies: block.registryDependencies,
    tree: buildTree(files),
    type: block.type,
  } satisfies Block;
}

export async function getBlock(name: string): Promise<Block | undefined> {
  const item = components[name as keyof typeof components];
  if (!item) return undefined;
  return getRegistryItem(item as RegistryEntry);
}

export async function getBlocks(category: string): Promise<Block[]> {
  const filteredBlocks = Object.values(components).filter(
    (item): item is RegistryEntry =>
      item.type === "registry:block" && item.name.startsWith(`${category}-`),
  );

  return Promise.all(
    filteredBlocks.map(async (block) => getRegistryItem(block)),
  );
}

export async function getRegistryComponents(
  category: string,
): Promise<RegistryEntry[]> {
  return Object.values(components).filter(
    (item): item is RegistryEntry =>
      item.type === "registry:component" &&
      Array.isArray(item.categories) &&
      item.categories.includes(category),
  );
}

function buildTree(files: BlockFile[]): TreeNode[] {
  const root: TreeNode[] = [];

  for (const file of files) {
    const parts = file.target.split("/");
    let currentLevel = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;
      const nodePath = parts.slice(0, i + 1).join("/");

      const existingNode = currentLevel.find((node) => node.name === part);

      if (existingNode) {
        if (!isFile) {
          if (!existingNode.children) existingNode.children = [];
          currentLevel = existingNode.children;
        }
      } else {
        const newNode: TreeNode = {
          name: part,
          path: nodePath,
        };

        if (!isFile) {
          newNode.children = [];
        }

        currentLevel.push(newNode);
        if (!isFile && newNode.children) {
          currentLevel = newNode.children;
        }
      }
    }
  }

  // Sort: folders first, then files alphabetically
  const sortNodes = (nodes: TreeNode[]): void => {
    nodes.sort((a, b) => {
      const aIsFolder = !!a.children;
      const bIsFolder = !!b.children;
      if (aIsFolder && !bIsFolder) return -1;
      if (!aIsFolder && bIsFolder) return 1;
      return a.name.localeCompare(b.name);
    });
    nodes.forEach((node) => {
      if (node.children) sortNodes(node.children);
    });
  };
  sortNodes(root);

  return root;
}
