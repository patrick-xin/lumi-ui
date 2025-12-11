"use client";

import * as React from "react";
import { ScrollArea as BaseScrollArea } from "@base-ui-components/react/scroll-area";

import { cn } from "@/lib/utils";

function ScrollAreaRoot({
  className,
  ...props
}: React.ComponentProps<typeof BaseScrollArea.Root>) {
  return (
    <BaseScrollArea.Root
      data-slot="scroll-area-root"
      className={cn("group/scroll-area relative overflow-hidden", className)}
      {...props}
    />
  );
}

function ScrollAreaViewport({
  className,
  gradientScrollFade,
  ...props
}: React.ComponentProps<typeof BaseScrollArea.Viewport> & {
  gradientScrollFade?: boolean;
}) {
  return (
    <BaseScrollArea.Viewport
      data-slot="scroll-area-viewport"
      className={cn(
        "h-full w-full rounded-[inherit] overscroll-contain",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2",
        gradientScrollFade && [
          "before:pointer-events-none before:absolute before:left-0 before:top-0 before:z-10 before:w-full before:content-['']",
          "after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:z-10 after:w-full after:content-['']",
          "before:transition-[height] before:duration-100 before:ease-out",
          "after:transition-[height] after:duration-100 after:ease-out",
          "before:bg-gradient-to-b before:from-background before:to-transparent",
          "after:bg-gradient-to-t after:from-background after:to-transparent",
          "before:[--scroll-area-overflow-y-start:inherit] before:h-[min(40px,var(--scroll-area-overflow-y-start))]",
          "after:[--scroll-area-overflow-y-end:inherit] after:h-[min(40px,var(--scroll-area-overflow-y-end,40px))]",
        ],
        className,
      )}
      {...props}
    />
  );
}

function ScrollAreaCorner({
  className,
  ...props
}: React.ComponentProps<typeof BaseScrollArea.Corner>) {
  return (
    <BaseScrollArea.Corner
      data-slot="scroll-area-corner"
      className={cn("bg-transparent", className)}
      {...props}
    />
  );
}

function ScrollAreaContent({
  className,
  ...props
}: React.ComponentProps<typeof BaseScrollArea.Content>) {
  return (
    <BaseScrollArea.Content
      data-slot="scroll-area-content"
      className={cn("flex-1 px-1", className)}
      {...props}
    />
  );
}

function ScrollAreaScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof BaseScrollArea.Scrollbar>) {
  return (
    <BaseScrollArea.Scrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none select-none transition-colors",
        "absolute z-20 p-0.5",
        orientation === "vertical" &&
          "right-0 top-0 bottom-0 w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
          "bottom-0 left-0 right-0 h-2.5 flex-col border-t border-t-transparent",
        "opacity-0 transition-opacity duration-200 pointer-events-none",
        "data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[hovering]:pointer-events-auto",
        "data-[scrolling]:opacity-100 data-[scrolling]:duration-0 data-[scrolling]:pointer-events-auto",
        orientation === "vertical" && "data-[has-overflow-y=false]:hidden",
        orientation === "horizontal" && "data-[has-overflow-x=false]:hidden",
        className,
      )}
      {...props}
    >
      <BaseScrollArea.Thumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </BaseScrollArea.Scrollbar>
  );
}

function ScrollArea({
  className,
  gradientScrollFade = false,
  children,
  ...props
}: React.ComponentProps<typeof BaseScrollArea.Root> & {
  gradientScrollFade?: boolean;
}) {
  return (
    <ScrollAreaRoot
      className={cn("flex flex-col h-full", className)}
      {...props}
    >
      <ScrollAreaViewport gradientScrollFade={gradientScrollFade} className="flex-1 min-h-0">
        <ScrollAreaContent>{children}</ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollBar orientation="vertical" />
      <ScrollAreaScrollBar orientation="horizontal" />
      <ScrollAreaCorner />
    </ScrollAreaRoot>
  );
}

export {
  ScrollArea,
  ScrollAreaScrollBar,
  ScrollAreaContent,
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaCorner,
};
