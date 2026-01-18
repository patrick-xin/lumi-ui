"use client";

import * as React from "react";
import { CopyButton } from "@/components/docs/copy-button";
import type { Block, TreeNode } from "@/types";
import { BlockFileTree } from "./block-file-tree";
import { FileIcon } from "./file-icons";

interface BlockCodeViewProps {
  item: Block;
  tree: TreeNode[];
  activeFile: string | null;
  onFileSelect: (file: string) => void;
  highlightedFiles?: Record<string, React.ReactNode>;
}

function BlockCodeContent({
  activeFile,
  highlightedFiles,
}: {
  activeFile: string | null;
  highlightedFiles?: Record<string, React.ReactNode>;
}) {
  if (!highlightedFiles) return null;

  const highlighted = activeFile ? highlightedFiles[activeFile] : null;

  return <div className="no-scrollbar overflow-y-auto">{highlighted}</div>;
}

export function BlockCodeView({
  item,
  tree,
  activeFile,
  onFileSelect,
  highlightedFiles,
}: BlockCodeViewProps) {
  const file = React.useMemo(() => {
    return item.files?.find(
      (f: { target: string; content: string }) => f.target === activeFile,
    );
  }, [item.files, activeFile]);

  if (!file) {
    return null;
  }

  const language = file.target?.split(".").pop() ?? "tsx";
  const content = file.content ?? "";

  return (
    <div className="bg-code text-code-foreground mr-[14px] flex overflow-hidden rounded-xl border group-data-[view=preview]/block-view-wrapper:hidden md:h-(--height)">
      <div className="w-72">
        <BlockFileTree
          activeFile={activeFile}
          onFileSelect={onFileSelect}
          tree={tree}
        />
      </div>
      <figure
        className="relative mx-0 mt-0 flex min-w-0 flex-1 flex-col rounded-md border-none"
        data-rehype-pretty-code-figure=""
      >
        <figcaption
          className="text-code-foreground [&_svg]:text-code-foreground flex h-12 shrink-0 items-center gap-2 border-b px-4 py-2 [&_svg]:size-4 [&_svg]:opacity-70"
          data-language={language}
        >
          <FileIcon filename={file.target} />
          <span className="truncate">{file.target}</span>
        </figcaption>
        <CopyButton className="top-1.5 right-2" code={content} variant="glow" />

        <BlockCodeContent
          activeFile={activeFile}
          highlightedFiles={highlightedFiles}
        />
      </figure>
    </div>
  );
}
