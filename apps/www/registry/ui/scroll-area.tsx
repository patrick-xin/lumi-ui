"use client";

import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import { cn } from "@/registry/lib/utils";

function ScrollAreaRoot({ className, ...props }: BaseScrollArea.Root.Props) {
  return (
    <BaseScrollArea.Root
      className={cn("group/scroll-area relative overflow-hidden", className)}
      data-slot="scroll-area"
      {...props}
    />
  );
}

function ScrollAreaViewport({
  className,
  gradientScrollFade,
  ...props
}: BaseScrollArea.Viewport.Props & {
  gradientScrollFade?: boolean;
}) {
  return (
    <BaseScrollArea.Viewport
      className={cn(
        "h-full w-full rounded-[inherit] overscroll-contain",
        "focus-visible:outline focus-visible:outline-ring/50 focus-visible:outline-offset-2",
        gradientScrollFade &&
          cn(
            "mask-[linear-gradient(to_bottom,transparent,black_min(1.2rem,var(--scroll-area-overflow-y-start)),black_calc(100%-min(1.2rem,var(--scroll-area-overflow-y-end,1.2rem))),transparent),linear-gradient(to_right,transparent,black_min(1.2rem,var(--scroll-area-overflow-x-start)),black_calc(100%-min(1.2rem,var(--scroll-area-overflow-x-end,1.2rem))),transparent)]",
            "[mask-composite:intersect] [-webkit-mask-composite:source-in]",
          ),
        className,
      )}
      data-slot="scroll-area-viewport"
      {...props}
    />
  );
}

function ScrollAreaCorner({
  className,
  ...props
}: BaseScrollArea.Corner.Props) {
  return (
    <BaseScrollArea.Corner
      className={cn("bg-transparent", className)}
      data-slot="scroll-area-corner"
      {...props}
    />
  );
}

function ScrollAreaContent({
  className,
  ...props
}: BaseScrollArea.Content.Props) {
  return (
    <BaseScrollArea.Content
      className={cn("flex-1 h-full", className)}
      data-slot="scroll-area-content"
      {...props}
    />
  );
}

function ScrollAreaScrollBar({
  className,
  orientation = "vertical",
  ...props
}: BaseScrollArea.Scrollbar.Props) {
  return (
    <BaseScrollArea.Scrollbar
      className={cn(
        "flex touch-none select-none transition-[colors,opacity]",
        "absolute z-20 p-0.5",
        orientation === "vertical" &&
          "right-0 top-0 bottom-0 w-2 border-l border-l-transparent",
        orientation === "horizontal" &&
          "bottom-0 left-0 right-0 h-2 flex-col border-t border-t-transparent",
        "opacity-0 duration-200 pointer-events-none",
        "data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[hovering]:pointer-events-auto",
        "data-[scrolling]:opacity-100 data-[scrolling]:duration-0 data-[scrolling]:pointer-events-auto",
        orientation === "vertical" && "data-[has-overflow-y=false]:hidden",
        orientation === "horizontal" && "data-[has-overflow-x=false]:hidden",
        className,
      )}
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      {...props}
    >
      <BaseScrollArea.Thumb
        className="bg-border relative flex-1 rounded-full"
        data-slot="scroll-area-thumb"
      />
    </BaseScrollArea.Scrollbar>
  );
}

function ScrollArea({
  className,
  gradientScrollFade = false,
  noScrollBar = false,
  children,
  ...props
}: BaseScrollArea.Root.Props & {
  gradientScrollFade?: boolean;
  noScrollBar?: boolean;
}) {
  return (
    <ScrollAreaRoot
      className={cn("flex flex-col h-full", className)}
      {...props}
    >
      <ScrollAreaViewport
        className="flex-1 min-h-0"
        gradientScrollFade={gradientScrollFade}
      >
        <ScrollAreaContent data-slot="scroll-area">
          {children}
        </ScrollAreaContent>
      </ScrollAreaViewport>
      {!noScrollBar && (
        <>
          <ScrollAreaScrollBar orientation="vertical" />
          <ScrollAreaScrollBar orientation="horizontal" />
        </>
      )}
      <ScrollAreaCorner />
    </ScrollAreaRoot>
  );
}

export {
  ScrollAreaRoot,
  ScrollAreaScrollBar,
  ScrollAreaContent,
  ScrollAreaViewport,
  ScrollAreaCorner,
  // Composite component
  ScrollArea,
};
