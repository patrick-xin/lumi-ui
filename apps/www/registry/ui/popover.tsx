import {
  Popover as BasePopover,
  type PopoverTriggerProps,
} from "@base-ui/react/popover";
import { cn } from "@/registry/lib/utils";
import { ArrowSvg } from "@/registry/ui/arrow-svg";

function Popover<Payload>(props: BasePopover.Root.Props<Payload>) {
  return <BasePopover.Root data-slot="popover" {...props} />;
}

function PopoverTrigger<Payload>(props: PopoverTriggerProps<Payload>) {
  return <BasePopover.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverBackdrop(props: BasePopover.Backdrop.Props) {
  return <BasePopover.Backdrop data-slot="popover-backdrop" {...props} />;
}

function PopoverPortal(props: BasePopover.Portal.Props) {
  return <BasePopover.Portal data-slot="popover-portal" {...props} />;
}

function PopoverPositioner({
  className,
  ...props
}: BasePopover.Positioner.Props) {
  return (
    <BasePopover.Positioner
      className={cn(
        "h-(--positioner-height) w-(--positioner-width) max-w-(--available-width)",
        className,
      )}
      data-slot="popover-positioner"
      {...props}
    />
  );
}

function PopoverPopup({ className, ...props }: BasePopover.Popup.Props) {
  return (
    <BasePopover.Popup
      className={cn("relative", className)}
      data-slot="popover-popup"
      {...props}
    />
  );
}

function PopoverArrow({ className, ...props }: BasePopover.Arrow.Props) {
  return (
    <BasePopover.Arrow
      className={cn(
        "data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180",
        className,
      )}
      data-slot="popover-arrow"
      {...props}
    >
      <ArrowSvg />
    </BasePopover.Arrow>
  );
}

function PopoverTitle({ className, ...props }: BasePopover.Title.Props) {
  return (
    <BasePopover.Title
      className={cn("text-sm font-semibold", className)}
      data-slot="popover-title"
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
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="popover-description"
      {...props}
    />
  );
}

function PopoverViewport({ className, ...props }: BasePopover.Viewport.Props) {
  return (
    <BasePopover.Viewport
      className={cn("relative h-full w-full", className)}
      data-slot="popover-viewport"
      {...props}
    />
  );
}

function PopoverClose({ ...props }: BasePopover.Close.Props) {
  return <BasePopover.Close data-slot="popover-close" {...props} />;
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
}: BasePopover.Popup.Props &
  Pick<
    BasePopover.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  > & {
    showArrow?: boolean;
    matchAnchorWidth?: boolean;
  }) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        align={align}
        alignOffset={alignOffset}
        className={cn(matchAnchorWidth && "w-[var(--anchor-width)]")}
        side={side}
        sideOffset={sideOffset}
      >
        <BasePopover.Popup
          className={cn(
            "relative rounded-md bg-popover p-3 text-popover-foreground shadow-md outline outline-border dark:-outline-offset-1",
            "animate-popup",
            className,
          )}
          data-slot="popover-popup"
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
  PopoverArrow,
  PopoverTitle,
  PopoverDescription,
  PopoverViewport,
  createPopoverHandle,
  // Composite component
  PopoverContent,
};
