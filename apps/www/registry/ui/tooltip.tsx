"use client";

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import type * as React from "react";
import { ArrowSvg } from "@/registry/ui/arrow-svg";
import { cn } from "@/registry/lib/utils";

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
      className={cn(
        "outline-none h-(--positioner-height) w-(--positioner-width) max-w-(--available-width)",
        className,
      )}
      data-slot="tooltip-positioner"
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
      className={cn("relative", className)}
      data-slot="tooltip-popup"
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
      className={cn(
        "flex",
        "data-[side=bottom]:-top-2 data-[side=bottom]:rotate-0",
        "data-[side=left]:-right-3 data-[side=left]:rotate-90",
        "data-[side=right]:-left-3 data-[side=right]:-rotate-90",
        "data-[side=top]:-bottom-2 data-[side=top]:rotate-180",
        className,
      )}
      data-slot="tooltip-arrow"
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
      className={cn("relative h-full w-full", className)}
      data-slot="tooltip-viewport"
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
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <BaseTooltip.Popup
          className={cn(
            "bg-foreground text-background w-fit rounded-md px-3 py-1.5 text-xs text-balance animate-popup duration-0 data-instant:transition-none",
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
  // Composite component
  TooltipContent,
};
