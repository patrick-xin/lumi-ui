import type { icons } from "lucide-react";
import { FOLDERS_WITH_STATUS } from "@/lib/constants";
import { IconMap } from "@/lib/icons";
import type { DocFolderNode, DocNode, DocPageNode, DocRoot } from "@/types";
import type { SidebarItem } from "@/types/sidebar";

const isActive = (url: string, pathname: string) => url === pathname;

export function normalizeSidebarTree(
  tree: DocRoot,
  pathname: string,
): SidebarItem[] {
  // Transform Fumadocs Root Children to SidebarHeaders
  const normalized = tree.children
    .map((node) => {
      if (node.type === "folder") {
        return {
          type: "header",
          label: node.name,
          items: transformChildren(
            node.children,
            pathname,
            node.name as string,
          ),
        } as SidebarItem;
      }
      return null;
    })
    .filter(Boolean) as SidebarItem[];

  // 2. INJECT MANUAL LINKS HERE IF NEEDED
  normalized.push({ type: "link", label: "llm.txt", href: "/llm.txt" });

  return normalized;
}

// Recursive Helper
function transformChildren(
  nodes: DocNode[],
  pathname: string,
  rootSectionName: string,
): SidebarItem[] {
  return nodes
    .map((node) => {
      // Handle Folders
      if (node.type === "folder") {
        return {
          type: "folder",
          label: node.name,
          defaultOpen: node.defaultOpen,
          items: transformChildren(
            (node as DocFolderNode).children,
            pathname,
            rootSectionName,
          ),
        } as SidebarItem;
      }

      // Handle Pages
      if (node.type === "page") {
        const page = node as DocPageNode;
        const shouldShowStatus = FOLDERS_WITH_STATUS.includes(rootSectionName);

        return {
          type: "link",
          label: page.name,
          href: page.url,
          active: isActive(page.url, pathname),
          icon: page.icon
            ? IconMap[page.icon as keyof typeof icons]
            : undefined,
          status: shouldShowStatus ? page.status : undefined,
        } as SidebarItem;
      }

      return null;
    })
    .filter(Boolean) as SidebarItem[];
}

// Helper: recursively check if any descendant is active
export function hasActiveChild(items: SidebarItem[]): boolean {
  return items.some((item) => {
    if (item.type === "link") {
      return item.active;
    }
    if (item.type === "folder") {
      return hasActiveChild(item.items);
    }
    return false;
  });
}
