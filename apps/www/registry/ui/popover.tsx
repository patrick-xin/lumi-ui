import {
  Popover as BasePopover,
  type PopoverTriggerProps,
} from "@base-ui/react/popover";
import { ArrowSvg } from "@/registry/ui/arrow-svg";

import { cn } from "@/lib/utils";

function Popover<Payload = unknown>({
  ...props
}: BasePopover.Root.Props<Payload>) {
  return <BasePopover.Root data-slot="popover" {...props} />;
}

function PopoverTrigger<Payload = unknown>({
  ...props
}: PopoverTriggerProps<Payload>) {
  return <BasePopover.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverBackdrop({ ...props }: BasePopover.Backdrop.Props) {
  return <BasePopover.Backdrop data-slot="popover-backdrop" {...props} />;
}

function PopoverPortal({ ...props }: BasePopover.Portal.Props) {
  return <BasePopover.Portal data-slot="popover-portal" {...props} />;
}

function PopoverPositioner({
  className,
  ...props
}: BasePopover.Positioner.Props) {
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

function PopoverPopup({ className, ...props }: BasePopover.Popup.Props) {
  return (
    <BasePopover.Popup
      data-slot="popover-popup"
      className={cn(
        "relative rounded-md bg-popover text-popover-foreground shadow-md outline outline-border dark:-outline-offset-1",
        "origin-[var(--transform-origin)] transition-[transform,scale,opacity]",
        className,
      )}
      {...props}
    />
  );
}

function PopoverArrow({ className, ...props }: BasePopover.Arrow.Props) {
  return (
    <BasePopover.Arrow
      data-slot="popover-arrow"
      className={cn(
        "data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180",
        className,
      )}
      {...props}
    >
      <ArrowSvg />
    </BasePopover.Arrow>
  );
}

function PopoverTitle({ className, ...props }: BasePopover.Title.Props) {
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
}: BasePopover.Description.Props) {
  return (
    <BasePopover.Description
      data-slot="popover-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function PopoverViewport({ className, ...props }: BasePopover.Viewport.Props) {
  return (
    <BasePopover.Viewport
      data-slot="popover-viewport"
      className={cn("relative h-full w-full", className)}
      {...props}
    />
  );
}

function PopoverClose({ ...props }: BasePopover.Close.Props) {
  return <BasePopover.Close data-slot="popover-close" {...props} />;
}


type PopoverContentProps = React.ComponentProps<typeof BasePopover.Popup>&{
  align?: BasePopover.Positioner.Props["align"];
  alignOffset?: BasePopover.Positioner.Props["alignOffset"];
  side?: BasePopover.Positioner.Props["side"];
  sideOffset?: BasePopover.Positioner.Props["sideOffset"];
  showArrow?: boolean;
  matchAnchorWidth?: boolean;
}

function PopoverContent({
  children,
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 8,
  showArrow = false,
  matchAnchorWidth = false,
  ...props
}: PopoverContentProps) {
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
            "relative rounded-md bg-popover p-3 text-popover-foreground shadow-md outline outline-border dark:-outline-offset-1",
            "origin-[var(--transform-origin)] transition-[transform,scale,opacity]",
            "animate-popup",
            className,
          )}
          {...props}
        >
          {showArrow && <PopoverArrow />}
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
