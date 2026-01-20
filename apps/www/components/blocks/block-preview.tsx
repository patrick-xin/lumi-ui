"use client";

import { cn } from "@/lib/utils";
import type { Block } from "@/types";
import {
  ResizableGroup,
  ResizablePanel,
  ResizableSeparator,
} from "@lumi-ui/ui/resizable";
import * as React from "react";
import type { PanelImperativeHandle } from "react-resizable-panels";

interface BlockPreviewProps {
  item: Block;
  iframeKey?: number;
  resizablePanelRef: React.RefObject<PanelImperativeHandle | null> | null;
}

function BlockViewerIframe({
  item,
  iframeKey,
  className,
}: {
  item: Block;
  iframeKey?: number;
  className?: string;
}) {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <iframe
      className={cn(
        "bg-background no-scrollbar relative w-full rounded-md",
        isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-500",
        className,
      )}
      height={(item.meta?.iframeHeight as number) ?? 950}
      key={iframeKey}
      loading="lazy"
      onLoad={() => setIsLoading(false)}
      src={`/view/${item.name}`}
      title="blocks"
    />
  );
}

export function BlockPreview({
  item,
  iframeKey,
  resizablePanelRef,
}: BlockPreviewProps) {
  const PANEL_ID = "preview-panel";
  const SPACER_ID = "spacer-panel";

  return (
    <div className="hidden group-data-[view=code]/block-view-wrapper:hidden md:h-(--height) lg:flex rounded-md">
      <div className="relative grid w-full gap-4">
        <div className="absolute inset-0 right-4 bg-[radial-gradient(#d4d4d4_1px,transparent_1px)] bg-size-[20px_20px] dark:bg-[radial-gradient(#404040_1px,transparent_1px)]" />

        <ResizableGroup
          className="rounded-md border"
          defaultLayout={{ [PANEL_ID]: 100, [SPACER_ID]: 0 }}
          orientation="horizontal"
        >
          <ResizablePanel
            className="aspect-[4/2.5] overflow-hidden md:aspect-auto"
            defaultSize={100}
            id={PANEL_ID}
            minSize={30}
            panelRef={resizablePanelRef}
          >
            <BlockViewerIframe iframeKey={iframeKey} item={item} />
          </ResizablePanel>
          <ResizableSeparator withHandle />
          <ResizablePanel defaultSize={0} id={SPACER_ID} minSize={0} />
        </ResizableGroup>
      </div>
    </div>
  );
}
