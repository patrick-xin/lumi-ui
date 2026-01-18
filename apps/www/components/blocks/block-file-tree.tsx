"use client";

import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@lumi-ui/ui/collapsible";
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
} from "@lumi-ui/ui/sidebar";
import { ChevronRight, Folder, FolderOpen } from "lucide-react";
import type * as React from "react";
import type { TreeNode } from "@/types";
import { FileIcon } from "./file-icons";

interface BlockFileTreeProps {
  tree: TreeNode[];
  activeFile: string | null;
  onFileSelect: (file: string) => void;
}

function Tree({
  item,
  index,
  activeFile,
  onFileSelect,
}: {
  item: TreeNode;
  index: number;
  activeFile: string | null;
  onFileSelect: (file: string) => void;
}) {
  if (!item.children) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          className="rounded-none pl-(--index) whitespace-nowrap"
          data-index={index}
          isActive={item.path === activeFile}
          onClick={() => item.path && onFileSelect(item.path)}
          style={
            {
              "--index": `${index * (index === 2 ? 1.2 : 1.3)}rem`,
            } as React.CSSProperties
          }
        >
          <ChevronRight className="invisible" />
          <FileIcon filename={item.name} />
          {item.name}
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <Collapsible defaultOpen>
        <CollapsibleTrigger
          render={
            <SidebarMenuButton
              className="group rounded-none pl-(--index) whitespace-nowrap"
              style={
                {
                  "--index": `${index * (index === 1 ? 1 : 1.2)}rem`,
                } as React.CSSProperties
              }
            >
              <ChevronRight className="transition-transform group-data-panel-open:rotate-90" />
              <Folder className="folder-closed size-4 text-blue-500 fill-blue-500/20" />
              <FolderOpen className="folder-open hidden size-4 text-blue-500 fill-blue-500/20" />
              {item.name}
            </SidebarMenuButton>
          }
        />
        <CollapsiblePanel>
          <SidebarMenuSub className="m-0 w-full translate-x-0 border-none p-0">
            {item.children.map((subItem, key) => (
              <Tree
                activeFile={activeFile}
                index={index + 1}
                item={subItem}
                key={key}
                onFileSelect={onFileSelect}
              />
            ))}
          </SidebarMenuSub>
        </CollapsiblePanel>
      </Collapsible>
    </SidebarMenuItem>
  );
}

export function BlockFileTree({
  tree,
  activeFile,
  onFileSelect,
}: BlockFileTreeProps) {
  if (!tree) {
    return null;
  }

  return (
    <SidebarProvider className="flex min-h-full flex-col border-r">
      <Sidebar className="w-full flex-1" collapsible="none">
        <SidebarGroupLabel className="h-12 rounded-none border-b px-4 text-sm">
          Files
        </SidebarGroupLabel>
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="translate-x-0 gap-1.5">
              {tree.map((file, index) => (
                <Tree
                  activeFile={activeFile}
                  index={1}
                  item={file}
                  key={index}
                  onFileSelect={onFileSelect}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </Sidebar>
    </SidebarProvider>
  );
}
