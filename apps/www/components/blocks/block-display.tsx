import { BlockSource } from "@/components/blocks/block-source";
import { ComponentView } from "@/components/blocks/component-view";
import { highlightCode } from "@/lib/highlight-code";
import type { Block, BlockFile } from "@/types";
import type { ReactNode } from "react";
import { ComponentName } from "../../registry/__registry";

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

interface BlockDisplayProps {
  block: Block;
}

export async function BlockDisplay({ block }: BlockDisplayProps) {
  const highlightedFiles = await getHighlightedFiles(block.files);

  return (
    <ComponentView
      description={block.description}
      iframeHeight={block.meta?.iframeHeight as number | string ?? 900 }
      name={block.name as ComponentName}
      source={<BlockSource block={block} highlightedFiles={highlightedFiles} />}
      title={block.description}
    />
  );
}
