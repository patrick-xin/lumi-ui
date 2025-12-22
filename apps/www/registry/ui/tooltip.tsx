"use client";

import * as React from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { cn } from "@/lib/utils";
import { ArrowSvg } from "@/registry/ui/arrow-svg";

function TooltipProvider({
  delay = 150,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Provider>) {
  return (
    <BaseTooltip.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  );
}

function Tooltip<Payload = unknown>({
  ...props
}: React.ComponentProps<typeof BaseTooltip.Root<Payload>>) {
  return <BaseTooltip.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger<Payload = unknown>({
  ...props
}: React.ComponentProps<typeof BaseTooltip.Trigger<Payload>>) {
  return <BaseTooltip.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipPortal({
  ...props
}: React.ComponentProps<typeof BaseTooltip.Portal>) {
  return <BaseTooltip.Portal data-slot="tooltip-portal" {...props} />;
}

function TooltipPositioner({
  className,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Positioner>) {
  return (
    <BaseTooltip.Positioner
      data-slot="tooltip-positioner"
      className={cn(
        "outline-none h-(--positioner-height) w-(--positioner-width) max-w-(--available-width)",
        className,
      )}
      {...props}
    />
  );
}

function TooltipPopup({
  className,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Popup>) {
  return (
    <BaseTooltip.Popup
      data-slot="tooltip-popup"
      className={cn("relative", className)}
      {...props}
    />
  );
}

function TooltipArrow({
  className,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Arrow>) {
  return (
    <BaseTooltip.Arrow
      data-slot="tooltip-arrow"
      className={cn(
        "flex",
        "data-[side=bottom]:-top-2 data-[side=bottom]:rotate-0",
        "data-[side=left]:right-[-13px] data-[side=left]:rotate-90",
        "data-[side=right]:left-[-13px] data-[side=right]:-rotate-90",
        "data-[side=top]:-bottom-2 data-[side=top]:rotate-180",
        className,
      )}
      {...props}
    >
      <ArrowSvg variant="tooltip" />
    </BaseTooltip.Arrow>
  );
}

function TooltipViewport({
  className,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Viewport>) {
  return (
    <BaseTooltip.Viewport
      data-slot="tooltip-viewport"
      className={cn("relative h-full w-full", className)}
      {...props}
    />
  );
}

type TooltipContentProps = React.ComponentProps<typeof BaseTooltip.Popup> & {
  align?: BaseTooltip.Positioner.Props["align"];
  alignOffset?: BaseTooltip.Positioner.Props["alignOffset"];
  side?: BaseTooltip.Positioner.Props["side"];
  sideOffset?: BaseTooltip.Positioner.Props["sideOffset"];
  showArrow?: boolean;
};

function TooltipContent({
  className,
  sideOffset = 10,
  side = "top",
  align = "center",
  alignOffset = 0,
  showArrow = true,
  children,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPortal>
      <BaseTooltip.Positioner
        sideOffset={sideOffset}
        side={side}
        align={align}
        alignOffset={alignOffset}
      >
        <BaseTooltip.Popup
          className={cn(
            "bg-foreground text-background z-50 w-fit rounded-md px-3 py-1.5 text-xs text-balance",
            "animate-popup data-instant:transition-none",
            className,
          )}
          {...props}
        >
          {children}
          {showArrow && <TooltipArrow />}
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </TooltipPortal>
  );
}

const createTooltipHandle = BaseTooltip.createHandle;

export {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipPortal,
  TooltipPositioner,
  TooltipPopup,
  TooltipArrow,
  TooltipViewport,
  createTooltipHandle,
  // Pre-assembled component
  TooltipContent,
};
