import type { Folder, Item, Root, Separator } from "fumadocs-core/page-tree";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
export type ComponentStatus = "planned" | "in-progress" | "new" | undefined;

export type DocPageNode = Item & {
  status?: ComponentStatus;
};

export type DocFolderNode = Folder & {
  children: DocNode[];
};

export type DocNode = DocPageNode | DocFolderNode | Separator;

export type DocRoot = Omit<Root, "children"> & {
  children: DocNode[];
};

export interface NavItem {
  value: string;
  label: string;
  url: string;
  status: ComponentStatus;
  folderName: string;
  icon?: LucideIcon | ReactNode;
  onSelect?: () => void;
}

export interface NavGroup {
  value: string;
  items: NavItem[];
}

export interface SidebarLinkItem {
  type: "link";
  label: string;
  href: string;
  icon?: LucideIcon | ReactNode;
  active?: boolean;
  status?: ComponentStatus;
  disabled?: boolean;
  external?: boolean;
}

export interface SidebarFolderItem {
  type: "folder";
  label: string;
  items: SidebarItem[];
  defaultOpen?: boolean;
}

export interface SidebarHeaderItem {
  type: "header";
  label: string;
  items: SidebarItem[];
}

export type SidebarItem =
  | SidebarLinkItem
  | SidebarFolderItem
  | SidebarHeaderItem;
