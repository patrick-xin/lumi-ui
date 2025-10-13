import type { PageTree } from "fumadocs-core/server";
import { source } from "@/lib/source";
import type { DocNode, DocRoot } from "@/types";

export function getTreeWithStatus(tree: PageTree.Root): DocRoot {
  const enrichNode = (node: PageTree.Node): DocNode => {
    if (node.type === "page") {
      const page = source.getNodePage(node);
      return {
        ...node,
        status: page?.data.status,
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
