"use client";

import { CodeBlockWrapper } from "@/components/code-block-wrapper";
import type { Block } from "@/types";
import * as React from "react";
import { BlockFileTree } from "./block-file-tree";
import { FileIcon } from "./file-icons";

interface BlockSourceProps {
  block: Block;
  highlightedFiles: Record<string, React.ReactNode>;
}

function BlockCodeContent({
  activeFile,
  highlightedFiles,
}: {
  activeFile: string | null;
  highlightedFiles: Record<string, React.ReactNode>;
}) {
  if (!highlightedFiles) return null;

  const highlighted = activeFile ? highlightedFiles[activeFile] : null;

  return <div className="no-scrollbar overflow-y-auto">{highlighted}</div>;
}

export function BlockSource({ block, highlightedFiles }: BlockSourceProps) {
  const [activeFile, setActiveFile] = React.useState<string | null>(
    block.files?.[0]?.target ?? null,
  );

  const file = React.useMemo(() => {
    return block.files?.find(
      (f: { target: string; content: string }) => f.target === activeFile,
    );
  }, [block.files, activeFile]);

  if (!file) {
    return null;
  }

  const language = file.target?.split(".").pop() ?? "tsx";
  const content = file.content ?? "";

  return (
    <div className="bg-code text-code-foreground flex overflow-hidden rounded-md h-[650px] md:h-(--height)">
      <div className="w-72 shrink-0">
        <BlockFileTree
          activeFile={activeFile}
          onFileSelect={setActiveFile}
          tree={block.tree}
        />
      </div>
      <CodeBlockWrapper
        className="mx-0 mt-0 min-w-0 flex-1 rounded-none border-none h-full"
        code={content}
        icon={<FileIcon filename={file.target} />}
        language={language}
        title={file.target}
      >
        <BlockCodeContent
          activeFile={activeFile}
          highlightedFiles={highlightedFiles}
        />
      </CodeBlockWrapper>
    </div>
  );
}
