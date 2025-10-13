import type { PageTree } from "fumadocs-core/server";

export type ComponentStatus = "planned" | "in-progress" | "new";

export type DocPageNode = PageTree.Item & {
  status?: ComponentStatus;
};

type DocFolderNode = PageTree.Folder & {
  children: DocNode[];
};

export type DocNode = DocPageNode | DocFolderNode | PageTree.Separator;

export type DocRoot = Omit<PageTree.Root, "children"> & {
  children: DocNode[];
};
