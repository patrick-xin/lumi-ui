"use client";

import {
  ResizableGroup,
  ResizablePanel,
  ResizableSeparator,
} from "@/registry/ui/resizable";

export const ResizableCollapsible = () => {
  return (
    <ResizableGroup className="md:min-w-96 md:min-h-80 rounded-md border">
      <ResizablePanel collapsible minSize={100}>
        <div className="flex size-full justify-center items-center text-sm">
          collapsible
        </div>
      </ResizablePanel>

      <ResizableSeparator withHandle />

      <ResizablePanel />
    </ResizableGroup>
  );
};
