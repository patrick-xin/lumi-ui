"use client";

import { Button } from "@lumi-ui/ui/button";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@lumi-ui/ui/collapsible";
import { cn } from "@lumi-ui/ui/lib/utils";
import { ChevronRight, Folder, FolderOpen } from "lucide-react";
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
      <Button
        className={cn(
          "rounded-none whitespace-nowrap w-full justify-start",
          item.path === activeFile &&
            "bg-accent hover:bg-accent! text-foreground!",
        )}
        data-index={index}
        onClick={() => item.path && onFileSelect(item.path)}
        style={{ paddingLeft: `${index * 1}rem` }}
        variant="ghost"
      >
        <ChevronRight className="invisible" />
        <FileIcon filename={item.name} />
        {item.name}
      </Button>
    );
  }

  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger
        render={
          <Button
            className="group rounded-none whitespace-nowrap w-full justify-start"
            style={{ paddingLeft: `${index * 1}rem` }}
            variant="ghost"
          >
            <ChevronRight className="transition-transform group-data-panel-open:rotate-90" />
            <Folder className="size-4 text-primary fill-primary/20" />
            <FolderOpen className="hidden size-4 text-primary fill-primary/20" />
            {item.name}
          </Button>
        }
      />
      <CollapsiblePanel>
        {item.children.map((subItem, key) => (
          <Tree
            activeFile={activeFile}
            index={index + 1}
            item={subItem}
            key={key}
            onFileSelect={onFileSelect}
          />
        ))}
      </CollapsiblePanel>
    </Collapsible>
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
    <div className="w-full flex-1 bg-sidebar h-full">
      <div className="h-11 flex  rounded-none items-center border-b px-4 text-sm">
        Files
      </div>

      <div className="gap-1.5">
        {tree.map((file, index) => (
          <Tree
            activeFile={activeFile}
            index={1}
            item={file}
            key={index}
            onFileSelect={onFileSelect}
          />
        ))}
      </div>
    </div>
  );
}
