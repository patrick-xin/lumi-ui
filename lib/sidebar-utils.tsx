import type { icons } from "lucide-react";
import { FOLDERS_WITH_STATUS } from "@/lib/constants";
import { IconMap } from "@/lib/icons";
import type {
  DocFolderNode,
  DocNode,
  DocPageNode,
  DocRoot,
  NavGroup,
  NavItem,
  SidebarItem,
} from "@/types";

const isActive = (url: string, pathname: string) => url === pathname;

export function normalizeSidebarTree(
  tree: DocRoot,
  pathname: string,
): SidebarItem[] {
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

export function getSearchGroups(tree: DocRoot): NavGroup[] {
  const sidebarItems = normalizeSidebarTree(tree, "");

  const groups: NavGroup[] = [];

  const flatten = (items: SidebarItem[], currentContext: string) => {
    const currentGroupItems: NavItem[] = [];

    items.forEach((item) => {
      if (item.type === "link") {
        currentGroupItems.push({
          value: item.href,
          label: item.label,
          url: item.href,
          status: item.status,
          folderName: currentContext,
        });
      } else if (item.type === "folder") {
        flatten(item.items, item.label);
      } else if (item.type === "header") {
        flatten(item.items, item.label);
      }
    });

    // Only add the group if it actually has direct link children
    if (currentGroupItems.length > 0) {
      groups.push({
        value: currentContext,
        items: currentGroupItems,
      });
    }
  };

  // Start flattening
  flatten(sidebarItems, "General");

  return groups;
}
