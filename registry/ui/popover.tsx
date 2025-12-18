import type * as React from "react";
import { Popover as BasePopover } from "@base-ui/react/popover";
import { ArrowSvg } from "@/registry/ui/arrow-svg";

import { cn } from "@/lib/utils";

function Popover({ ...props }: React.ComponentProps<typeof BasePopover.Root>) {
  return <BasePopover.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof BasePopover.Trigger>) {
  return <BasePopover.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverBackdrop({
  ...props
}: React.ComponentProps<typeof BasePopover.Backdrop>) {
  return <BasePopover.Backdrop data-slot="popover-backdrop" {...props} />;
}

function PopoverPortal({
  ...props
}: React.ComponentProps<typeof BasePopover.Portal>) {
  return <BasePopover.Portal data-slot="popover-portal" {...props} />;
}

function PopoverPositioner({
  className,
  ...props
}: React.ComponentProps<typeof BasePopover.Positioner>) {
  return (
    <BasePopover.Positioner
      data-slot="popover-positioner"
      className={cn(
        "h-(--positioner-height) w-(--positioner-width) max-w-(--available-width)",
        className,
      )}
      {...props}
    />
  );
}

function PopoverPopup({
  className,
  ...props
}: React.ComponentProps<typeof BasePopover.Popup>) {
  return (
    <BasePopover.Popup
      data-slot="popover-popup"
      className={cn(
        "rounded-md bg-popover p-3 text-popover-foreground shadow-md outline outline-border dark:-outline-offset-1",
        className,
      )}
      {...props}
    />
  );
}

function PopoverArrow({
  ...props
}: React.ComponentProps<typeof BasePopover.Arrow>) {
  return (
    <BasePopover.Arrow data-slot="popover-arrow" {...props}>
      <ArrowSvg />
    </BasePopover.Arrow>
  );
}

function PopoverTitle({
  className,
  ...props
}: React.ComponentProps<typeof BasePopover.Title>) {
  return (
    <BasePopover.Title
      data-slot="popover-title"
      className={cn("text-sm font-semibold", className)}
      {...props}
    />
  );
}

function PopoverDescription({
  className,
  ...props
}: React.ComponentProps<typeof BasePopover.Description>) {
  return (
    <BasePopover.Description
      data-slot="popover-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function PopoverViewport({
  ...props
}: React.ComponentProps<typeof BasePopover.Viewport>) {
  return <BasePopover.Viewport data-slot="popover-viewport" {...props} />;
}

function PopoverClose({
  ...props
}: React.ComponentProps<typeof BasePopover.Close>) {
  return <BasePopover.Close data-slot="popover-close" {...props} />;
}

function PopoverContent({
  children,
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 6,
  showArrow = false,
  title,
  description,
  matchAnchorWidth = false,
  ...props
}: React.ComponentProps<typeof BasePopover.Popup> & {
  align?: BasePopover.Positioner.Props["align"];
  alignOffset?: BasePopover.Positioner.Props["alignOffset"];
  side?: BasePopover.Positioner.Props["side"];
  sideOffset?: BasePopover.Positioner.Props["sideOffset"];
  showArrow?: boolean;
  title?: string;
  description?: string;
  matchAnchorWidth?: boolean;
}) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className={cn(matchAnchorWidth && "w-[var(--anchor-width)]")}
      >
        <BasePopover.Popup
          data-slot="popover-popup"
          className={cn(
            "rounded-md bg-popover p-3 text-popover-foreground shadow-md outline outline-border dark:-outline-offset-1",
            "animate-popup",
            className,
          )}
          {...props}
        >
          {title && (
            <BasePopover.Title
              data-slot="popover-title"
              className="text-sm font-semibold"
            >
              {title}
            </BasePopover.Title>
          )}
          {description && (
            <BasePopover.Description
              data-slot="popover-description"
              className="text-muted-foreground text-sm"
            >
              {description}
            </BasePopover.Description>
          )}
          {showArrow && (
            <BasePopover.Arrow className="data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180">
              <ArrowSvg />
            </BasePopover.Arrow>
          )}
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}

const createPopoverHandle = BasePopover.createHandle;

export {
  Popover,
  PopoverClose,
  PopoverPopup,
  PopoverPositioner,
  PopoverTrigger,
  PopoverBackdrop,
  PopoverPortal,
  PopoverContent,
  PopoverArrow,
  PopoverTitle,
  PopoverDescription,
  PopoverViewport,
  createPopoverHandle,
};
