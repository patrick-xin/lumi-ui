"use client";

import { cn } from "@lumi-ui/ui/lib/utils";
import { GripVerticalIcon } from "lucide-react";
import {
  Group as BaseGroup,
  Panel as BasePanel,
  Separator as BaseSeparator,
  type GroupProps,
  type PanelProps,
  type SeparatorProps,
} from "react-resizable-panels";

function ResizableGroup({
  orientation = "horizontal",
  className,
  ...props
}: GroupProps) {
  return (
    <BaseGroup
      className={cn("flex h-full w-full", className)}
      data-slot="resizable-panel-group"
      orientation={orientation}
      {...props}
    />
  );
}

function ResizablePanel(props: PanelProps) {
  return <BasePanel data-slot="resizable-panel" {...props} />;
}

function ResizableSeparator({
  className,
  withHandle,
  ...props
}: SeparatorProps & {
  withHandle?: boolean;
}) {
  return (
    <BaseSeparator
      className={cn(
        "relative flex items-center justify-center outline-none group bg-border",
        "focus-visible:bg-primary/40 data-[separator='active']:bg-primary/40 data-[separator='inactive']:bg-border",
        "aria-[orientation=vertical]:w-px aria-[orientation=vertical]:h-auto",
        "aria-[orientation=vertical]:after:w-4 aria-[orientation=vertical]:after:h-full aria-[orientation=vertical]:after:-left-1.5",
        "aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full",
        "aria-[orientation=horizontal]:after:h-4 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:-top-1.5",
        "after:absolute after:inset-0 after:flex after:items-center after:justify-center",
        className,
      )}
      data-slot="resizable-separator"
      {...props}
    >
      {withHandle && (
        <div
          className={cn(
            "relative z-10 bg-background flex items-center justify-center rounded-xs border",
            "group-aria-[orientation=vertical]:h-4 group-aria-[orientation=vertical]:w-3",
            "group-aria-[orientation=horizontal]:h-3 group-aria-[orientation=horizontal]:w-4",
          )}
        >
          <GripVerticalIcon
            className={cn(
              "size-3 text-muted-foreground",
              "group-data-[separator='active']:text-foreground",
              "group-aria-[orientation=horizontal]:rotate-90",
            )}
          />
        </div>
      )}
    </BaseSeparator>
  );
}

export { ResizableGroup, ResizablePanel, ResizableSeparator };
