"use client";

import {
  CheckCircle2,
  ChevronRight,
  File,
  FileJson,
  FileText,
  Folder,
  FolderOpen,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/registry/ui/collapsible";

export type TreeItemType = {
  id: string;
  name: string;
  type: "folder" | "file";
  children?: TreeItemType[];
  icon?: React.ReactNode;
  badge?: string | number | React.ReactNode;
  badgeColor?: "default" | "blue" | "red" | "green";
  isOpen?: boolean;
};

interface TreeItemProps {
  item: TreeItemType;
  depth?: number;
}

function getFileIcon(name: string, customIcon?: React.ReactNode) {
  if (customIcon) return customIcon;
  if (name.endsWith(".tsx") || name.endsWith(".ts"))
    return <FileText className="size-4 text-blue-400" />;
  if (name.endsWith(".css"))
    return <FileText className="size-4 text-sky-300" />;
  if (name.endsWith(".json"))
    return <FileJson className="size-4 text-yellow-400" />;
  if (name.endsWith(".png") || name.endsWith(".jpg"))
    return <ImageIcon className="size-4 text-purple-400" />;
  if (name.endsWith(".md"))
    return <FileText className="size-4 text-gray-400" />;
  return <File className="size-4 text-muted-foreground" />;
}

function TreeItem({ item, depth = 0 }: TreeItemProps) {
  const isFolder = item.type === "folder";
  const paddingLeft = depth * 16 + 12;

  const renderBadge = () => {
    if (!item.badge) return null;
    if (React.isValidElement(item.badge)) {
      return <div className="ml-auto flex items-center">{item.badge}</div>;
    }

    const colorStyles = {
      blue: "bg-blue-600 text-white",
      default: "bg-muted text-muted-foreground",
      green: "bg-green-900/50 text-green-200 border border-green-900",
      red: "bg-red-900/50 text-red-200 border border-red-900",
    };

    return (
      <span
        className={cn(
          "ml-auto text-[10px] px-1.5 py-0.5 rounded-full font-medium leading-none",
          colorStyles[item.badgeColor || "default"],
        )}
      >
        {item.badge}
      </span>
    );
  };

  if (isFolder) {
    return (
      <Collapsible className="w-full" defaultOpen={item.isOpen}>
        <CollapsibleTrigger
          render={
            <button
              className={cn(
                "group flex w-full items-center gap-2 py-1.5 pr-3 text-sm hover:bg-accent/50 text-foreground transition-colors rounded-sm",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              )}
              style={{ paddingLeft: `${paddingLeft}px` }}
              type="button"
            >
              <ChevronRight className="size-4 text-muted-foreground shrink-0 transition-transform duration-200 group-data-[panel-open]:rotate-90" />
              <Folder className="size-4 text-blue-500 fill-blue-500/20 group-data-[panel-open]:hidden" />
              <FolderOpen className="size-4 text-blue-500 fill-blue-500/20 hidden group-data-[panel-open]:block" />
              <span className="truncate font-medium">{item.name}</span>
              {renderBadge()}
            </button>
          }
        />
        <CollapsiblePanel className="relative">
          <div
            className="absolute left-0 w-px bg-border/40 h-full"
            style={{ left: `${paddingLeft + 7}px` }}
          />
          {item.children?.map((child) => (
            <TreeItem depth={depth + 1} item={child} key={child.id} />
          ))}
        </CollapsiblePanel>
      </Collapsible>
    );
  }

  return (
    <div
      className="flex items-center gap-2 py-1.5 pr-3 text-sm text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors cursor-pointer rounded-sm"
      style={{ paddingLeft: `${paddingLeft + 20}px` }}
    >
      {getFileIcon(item.name, item.icon)}
      <span className="truncate">{item.name}</span>
      {renderBadge()}
    </div>
  );
}

const exampleData: TreeItemType[] = [
  {
    badge: "New",
    children: [
      {
        badge: 9,
        badgeColor: "blue",
        children: [
          {
            children: [
              { id: "button", name: "button.tsx", type: "file" },
              { id: "collapsible", name: "collapsible.tsx", type: "file" },
              {
                badge: "Error",
                badgeColor: "red",
                id: "dialog",
                name: "dialog.tsx",
                type: "file",
              },
            ],
            id: "ui",
            isOpen: true,
            name: "ui",
            type: "folder",
          },
          {
            badge: <CheckCircle2 className="size-3 text-green-500" />,
            id: "header",
            name: "header.tsx",
            type: "file",
          },
          { id: "footer", name: "footer.tsx", type: "file" },
        ],
        id: "components",
        isOpen: true,
        name: "components",
        type: "folder",
      },
      {
        children: [
          { id: "utils", name: "utils.ts", type: "file" },
          {
            icon: (
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            ),
            id: "hooks",
            name: "hooks.ts",
            type: "file",
          },
        ],
        id: "lib",
        name: "lib",
        type: "folder",
      },
      {
        badge: 2,
        children: [
          { id: "page", name: "page.tsx", type: "file" },
          { id: "layout", name: "layout.tsx", type: "file" },
        ],
        id: "app",
        name: "app",
        type: "folder",
      },
    ],
    id: "src",
    isOpen: true,
    name: "src",
    type: "folder",
  },
  {
    children: [
      {
        children: [{ id: "logo", name: "logo.png", type: "file" }],
        id: "images",
        name: "images",
        type: "folder",
      },
    ],
    id: "public",
    name: "public",
    type: "folder",
  },
  {
    icon: (
      <div className="size-4 text-red-500 font-bold text-[10px] leading-4 text-center">
        npm
      </div>
    ),
    id: "pkg",
    name: "package.json",
    type: "file",
  },
  {
    badge: "Docs",
    badgeColor: "default",
    id: "readme",
    name: "README.md",
    type: "file",
  },
];

export function CollapsibleFileTreeDemo() {
  return (
    <div className="w-full max-w-sm rounded-lg border bg-background/50 p-2 font-mono text-sm shadow-sm">
      {exampleData.map((item) => (
        <TreeItem item={item} key={item.id} />
      ))}
    </div>
  );
}
