import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

// 1. The Atomic Link (Leaf Node)
export interface SidebarLinkItem {
  type: "link";
  label: string;
  href: string;
  icon?: LucideIcon | ReactNode;
  active?: boolean;
  status?: "new" | "wip" | "planned"; // Extensible status
  disabled?: boolean;
  external?: boolean; // New feature: external links
}

// 2. The Folder (Parent Node)
export interface SidebarFolderItem {
  type: "folder";
  label: string;
  items: SidebarItem[]; // Recursive
  defaultOpen?: boolean;
}

// 3. The Section Header (Root Separator)
export interface SidebarHeaderItem {
  type: "header";
  label: string;
  items: SidebarItem[]; // Items belonging to this section
}

// The Union Type
export type SidebarItem =
  | SidebarLinkItem
  | SidebarFolderItem
  | SidebarHeaderItem;
