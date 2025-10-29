import "server-only";

import type { Node, Root } from "fumadocs-core/page-tree";
import { source } from "@/lib/source";
import type { DocNode, DocRoot } from "@/types";

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

export function transformNavigation() {
  const data = getTreeWithStatus(source.pageTree);
  return data.children
    .filter(
      (node): node is Extract<DocNode, { type: "folder" }> =>
        node.type === "folder",
    )
    .map((folder) => {
      const folderName = getNodeNameAsString(folder.name);
      if (!folderName) return null;

      const items = folder.children
        .filter(
          (node): node is Extract<DocNode, { type: "page" }> =>
            node.type === "page",
        )
        .map((page) => {
          const pageLabel = getNodeNameAsString(page.name);
          if (!pageLabel) return null;

          return {
            value: page.url.split("/").pop() as string,
            label: pageLabel,
            url: page.url,
            folderName,
            status: page.status,
          };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);

      return {
        value: folderName,
        items: items,
      };
    })
    .filter((group): group is NonNullable<typeof group> => group !== null);
}
