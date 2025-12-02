import type { Folder, Item, Root, Separator } from "fumadocs-core/page-tree";

export type ComponentStatus = "planned" | "in-progress" | "new" | undefined;

export type DocPageNode = Item & {
  status?: ComponentStatus;
};

type DocFolderNode = Folder & {
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
  onSelect?: () => void;
}

export interface NavGroup {
  value: string;
  items: NavItem[];
}
