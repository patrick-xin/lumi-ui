"use client"

import * as React from "react"
import { Tooltip as BaseTooltip } from "@base-ui-components/react/tooltip"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  closeDelayDuration = 0,
  timeout = 400,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Provider> & {
  delayDuration?: number
  closeDelayDuration?: number
}) {
  return (
    <BaseTooltip.Provider
      data-slot="tooltip-provider"
      delay={delayDuration}
      closeDelay={closeDelayDuration}
      timeout={timeout}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof BaseTooltip.Root>) {
  return <TooltipProvider>
    <BaseTooltip.Root data-slot="tooltip" {...props} />
  </TooltipProvider> 
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof BaseTooltip.Trigger>) {
  return <BaseTooltip.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipPortal({
  ...props
}: React.ComponentProps<typeof BaseTooltip.Portal>) {
  return <BaseTooltip.Portal data-slot="tooltip-portal" {...props} />
}

function TooltipPositioner({
  className,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Positioner>) {
  return (
    <BaseTooltip.Positioner
      data-slot="tooltip-positioner"
      className={cn("outline-none", className)}
      {...props}
    />
  )
}

function TooltipPopup({
  className,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Popup>) {
  return (
    <BaseTooltip.Popup
      data-slot="tooltip-popup"
      className={cn(
        "bg-foreground text-background z-50 w-fit rounded-md px-3 py-1.5 text-xs text-balance",
        "origin-(--transform-origin) transition-[transform,scale,opacity] duration-200",
        "data-starting-style:scale-95 data-starting-style:opacity-0",
        "data-ending-style:scale-95 data-ending-style:opacity-0",
        "data-instant:transition-none",
        className
      )}
      {...props}
    />
  )
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
        className
      )}
      {...props}
    >
      <ArrowSvg />
    </BaseTooltip.Arrow>
  )
}

function ArrowSvg(props: React.ComponentProps<"svg">) {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" {...props}>
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className="fill-foreground"
      />
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        className="fill-foreground dark:fill-none"
      />
      <path
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        className="fill-foreground"
      />
    </svg>
  );
}

function TooltipViewport({
  className,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Viewport>) {
  return (
    <BaseTooltip.Viewport
      data-slot="tooltip-viewport"
      className={cn("", className)}
      {...props}
    />
  )
}

interface TooltipContentProps
  extends Omit<React.ComponentProps<typeof BaseTooltip.Popup>, "children"> {
  sideOffset?: number
  side?: "top" | "bottom" | "left" | "right"
  align?: "start" | "center" | "end"
  alignOffset?: number
  showArrow?: boolean
  children?: React.ReactNode
  container?: React.ComponentProps<typeof BaseTooltip.Portal>["container"]
}

function TooltipContent({
  className,
  sideOffset = 10,
  side = "top",
  align = "center",
  alignOffset = 0,
  showArrow = true,
  children,
  container,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPortal container={container}>
      <TooltipPositioner
        sideOffset={sideOffset}
        side={side}
        align={align}
        alignOffset={alignOffset}
      >
        <TooltipPopup className={className} {...props}>
          {children}
          {showArrow && <TooltipArrow />}
        </TooltipPopup>
      </TooltipPositioner>
    </TooltipPortal>
  )
}

const createTooltipHandle = BaseTooltip.createHandle

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipPortal,
  TooltipPositioner,
  TooltipPopup,
  TooltipArrow,
  TooltipViewport,
  createTooltipHandle,
}