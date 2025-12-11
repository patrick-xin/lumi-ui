"use client";

import * as React from "react";
import { ScrollArea as BaseScrollArea } from "@base-ui-components/react/scroll-area";

import { cn } from "@/lib/utils";

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseScrollArea.Root>) {
  return (
    <BaseScrollArea.Root
      data-slot="scroll-area"
      className={cn("relative overflow-hidden flex flex-col", className)}
      {...props}
    >
      <BaseScrollArea.Viewport
        data-slot="scroll-area-viewport"
        className={cn(
          "flex-1 min-h-0 w-full pr-4 overflow-y-auto rounded-[inherit] overscroll-contain",
          "focus-visible:outline focus-visible:outline-ring/5 focus-visible:outline-offset-2",
        )}
      >
        <ScrollContent>{children}</ScrollContent>
      </BaseScrollArea.Viewport>
      <ScrollBar />
      <BaseScrollArea.Corner />
    </BaseScrollArea.Root>
  );
}

function ScrollContent({
  className,
  ...props
}: React.ComponentProps<typeof BaseScrollArea.Content>) {
  return (
    <BaseScrollArea.Content
      data-slot="scroll-area-content"
      className={cn(className)}
      {...props}
    />
  );
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof BaseScrollArea.Scrollbar>) {
  return (
    <BaseScrollArea.Scrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex justify-center touch-none p-px transition-colors select-none rounded-[inherit]",
        orientation === "vertical" &&
          "h-full w-2 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-2 flex-col border-t border-t-transparent",
        className,
      )}
      {...props}
    >
      <BaseScrollArea.Thumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded"
      />
    </BaseScrollArea.Scrollbar>
  );
}

export { ScrollArea, ScrollBar, ScrollContent };
