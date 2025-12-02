import { Popover as BasePopover } from "@base-ui-components/react/popover";
import type * as React from "react";

import { cn } from "@/lib/utils";

function Popover({
  ...props
}: React.ComponentProps<typeof BasePopover.Root>) {
  return <BasePopover.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof BasePopover.Trigger>) {
  return <BasePopover.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverClose({
  ...props
}: React.ComponentProps<typeof BasePopover.Close>) {
  return <BasePopover.Close data-slot="popover-close" {...props} />;
}

function PopoverPositioner({
  ...props
}: React.ComponentProps<typeof BasePopover.Positioner>) {
  return (
    <BasePopover.Positioner data-slot="popover-positioner" {...props} />
  );
}

function PopoverPopup({
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
            "rounded-md bg-popover p-4 text-popover-foreground shadow-md outline outline-border dark:-outline-offset-1",
            "transition-[transform,scale,opacity] origin-[var(--transform-origin)]",
            "data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-90 data-[ending-style]:opacity-0",
            className,
          )}
          {...props}
        >
          {title && (
            <BasePopover.Title
              data-slot="popover-title"
              className="text-base font-semibold"
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

function ArrowSvg(props: React.ComponentProps<"svg">) {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" {...props}>
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className="fill-popover"
      />
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        className="fill-border dark:fill-none"
      />
      <path
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        className="fill-border"
      />
    </svg>
  );
}

export {
  Popover,
  PopoverClose,
  PopoverPopup,
  PopoverPositioner,
  PopoverTrigger,
};
