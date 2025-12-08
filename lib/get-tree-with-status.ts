import "server-only";

import type { Node, Root } from "fumadocs-core/page-tree";
import { source } from "@/lib/source";
import type { DocNode, DocRoot, NavGroup, NavItem } from "@/types";

export function getTreeWithStatus(tree: Root): DocRoot {
  const enrichNode = (node: Node): DocNode => {
    if (node.type === "page") {
      const page = source.getNodePage(node);

      return {
        ...node,
        status: page?.data.status,
        icon: page?.data.icon,
      };
    }
    if (node.type === "folder") {
      return {
        ...node,
        children: node.children.map(enrichNode),
      };
    }
    return node;
  };

  return {
    ...tree,
    children: tree.children.map(enrichNode),
  };
}

function getNodeNameAsString(name: React.ReactNode): string | null {
  if (typeof name === "string") {
    return name;
  }
  if (typeof name === "number") {
    return String(name);
  }
  return null;
}

export function transformNavigation(): NavGroup[] {
  const docRoot = getTreeWithStatus(source.pageTree);
  const groups: NavGroup[] = [];

  // Recursive function to traverse folders
  const visit = (node: DocNode) => {
    if (node.type === "folder") {
      const folderName = getNodeNameAsString(node.name);

      // 1. Collect all direct PAGE children of this folder
      const pageChildren = node.children.filter(
        (child): child is Extract<DocNode, { type: "page" }> =>
          child.type === "page",
      );

      // 2. If this folder has pages, create a Navigation Group for it
      if (folderName && pageChildren.length > 0) {
        const items = pageChildren
          .map((page) => {
            const pageLabel = getNodeNameAsString(page.name);
            if (!pageLabel) return null;

            return {
              value: page.url.split("/").pop() as string,
              label: pageLabel,
              url: page.url,
              folderName: folderName,
              status: page.status,
            };
          })
          .filter((item): item is NavItem => item !== null);

        if (items.length > 0) {
          groups.push({
            value: folderName,
            items,
          });
        }
      }

      // 3. Recursively visit sub-folders (to find "Form & Input" inside "Components")
      const folderChildren = node.children.filter(
        (child): child is Extract<DocNode, { type: "folder" }> =>
          child.type === "folder",
      );

      folderChildren.forEach(visit);
    }
  };

  // Start the recursion from the root children
  docRoot.children.forEach(visit);

  return groups;
}
