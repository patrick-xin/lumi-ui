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
          items: transformChildren(
            node.children,
            pathname,
            node.name as string,
          ),
          label: node.name,
          type: "header",
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
          defaultOpen: node.defaultOpen,
          items: transformChildren(
            (node as DocFolderNode).children,
            pathname,
            rootSectionName,
          ),
          label: node.name,
          type: "folder",
        } as SidebarItem;
      }

      // Handle Pages
      if (node.type === "page") {
        const page = node as DocPageNode;
        const shouldShowStatus = FOLDERS_WITH_STATUS.includes(rootSectionName);

        return {
          active: isActive(page.url, pathname),
          disabled: page.status === "planned",
          href: page.url,
          icon: page.icon
            ? IconMap[page.icon as keyof typeof icons]
            : undefined,
          label: page.name,
          status: shouldShowStatus ? page.status : undefined,
          type: "link",
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
          folderName: currentContext,
          icon: item.icon,
          label: item.label,
          status: item.status,
          url: item.href,
          value: item.href,
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
        items: currentGroupItems,
        value: currentContext,
      });
    }
  };

  flatten(sidebarItems, "General");

  return groups;
}
