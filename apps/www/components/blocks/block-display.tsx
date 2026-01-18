import type { ReactNode } from "react";
import { BlockViewer } from "@/components/blocks/block-view";
import { highlightCode } from "@/lib/highlight-code";
import type { Block, BlockFile } from "@/types";

async function getHighlightedFiles(
  files: BlockFile[],
): Promise<Record<string, ReactNode>> {
  const highlightedEntries = await Promise.all(
    files.map(async (file) => {
      const language = file.target.split(".").pop() ?? "tsx";
      const highlighted = await highlightCode(file.content, language, {
        lineNumbers: true,
      });
      return [file.target, highlighted] as const;
    }),
  );

  return Object.fromEntries(highlightedEntries);
}

interface BlockWrapperProps {
  block: Block;
}

export function BlockWrapper({ block }: BlockWrapperProps) {
  const highlightedFilesPromise = getHighlightedFiles(block.files);

  return (
    <BlockViewer
      highlightedFiles={highlightedFilesPromise}
      item={block}
      tree={block.tree}
    >
      <div />
    </BlockViewer>
  );
}
