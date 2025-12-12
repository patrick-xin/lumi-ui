"use client";

import * as React from "react";
import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function ContextMenu({
  ...props
}: React.ComponentProps<typeof BaseContextMenu.Root>) {
  return <BaseContextMenu.Root data-slot="context-menu" {...props} />;
}

function ContextMenuTrigger({
  ...props
}: React.ComponentProps<typeof BaseContextMenu.Trigger>) {
  return (
    <BaseContextMenu.Trigger data-slot="context-menu-trigger" {...props} />
  );
}

function ContextMenuGroup({
  ...props
}: React.ComponentProps<typeof BaseContextMenu.Group>) {
  return <BaseContextMenu.Group data-slot="context-menu-group" {...props} />;
}

function ContextMenuPortal({
  ...props
}: React.ComponentProps<typeof BaseContextMenu.Portal>) {
  return <BaseContextMenu.Portal data-slot="context-menu-portal" {...props} />;
}

function ContextMenuBackdrop({
  ...props
}: React.ComponentProps<typeof BaseContextMenu.Backdrop>) {
  return (
    <BaseContextMenu.Backdrop data-slot="context-menu-backdrop" {...props} />
  );
}

function ContextMenuSub({
  ...props
}: React.ComponentProps<typeof BaseContextMenu.SubmenuRoot>) {
  return <BaseContextMenu.SubmenuRoot data-slot="context-menu-sub" {...props} />;
}

function ContextMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof BaseContextMenu.RadioGroup>) {
  return (
    <BaseContextMenu.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  );
}

function ContextMenuPositioner({
  className,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.Positioner>) {
  return (
    <BaseContextMenu.Positioner
      className={cn(className)}
      data-slot="context-menu-positioner"
      {...props}
    />
  );
}

function ContextMenuPopup({
  className,
  "data-slot": dataSlot,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.Popup> & {
  "data-slot"?: string;
}) {
  const finalSlot = dataSlot || "context-menu-popup";
  return (
    <BaseContextMenu.Popup
      className={cn(className)}
      data-slot={finalSlot}
      {...props}
    />
  );
}

function ContextMenuArrow({
  ...props
}: React.ComponentProps<typeof BaseContextMenu.Arrow>) {
  return <BaseContextMenu.Arrow data-slot="context-menu-arrow" {...props} />;
}

type ContextMenuContentProps = React.ComponentProps<
  typeof BaseContextMenu.Popup
> & {
  align?: React.ComponentProps<typeof BaseContextMenu.Positioner>["align"];
  alignOffset?: React.ComponentProps<
    typeof BaseContextMenu.Positioner
  >["alignOffset"];
  side?: React.ComponentProps<typeof BaseContextMenu.Positioner>["side"];
  sideOffset?: React.ComponentProps<
    typeof BaseContextMenu.Positioner
  >["sideOffset"];
  /**
   * Whether to display the arrow pointing to the trigger.
   * @default false
   */
  showArrow?: boolean;
  positionerProps?: Omit<
    React.ComponentProps<typeof BaseContextMenu.Positioner>,
    "children" | "className"
  >;
  portalProps?: React.ComponentProps<typeof BaseContextMenu.Portal>;
};

function ContextMenuContent({
  children,
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  showArrow = false,
  positionerProps,
  portalProps,
  ...popupProps
}: ContextMenuContentProps) {
  return (
    <ContextMenuPortal {...portalProps}>
      <ContextMenuPositioner
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        side={side}
        className="max-h-(--available-height) outline-none"
        {...positionerProps}
      >
        <ContextMenuPopup
          data-slot="context-menu-content"
          className={cn(
            "p-1 bg-popover text-popover-foreground rounded-md outline outline-border dark:-outline-offset-1 shadow-md",
            "transition-[transform,scale,opacity] origin-[var(--transform-origin)]",
            "data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-90 data-[ending-style]:opacity-0",
            className
          )}
          {...popupProps}
        >
          {showArrow && (
            <ContextMenuArrow className="data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180">
              <ArrowSvg />
            </ContextMenuArrow>
          )}
          {children}
        </ContextMenuPopup>
      </ContextMenuPositioner>
    </ContextMenuPortal>
  );
}

function ContextMenuSubContent({
  align = "start",
  side = "right",
  sideOffset = 8,
  alignOffset = -4,
  ...props
}: ContextMenuContentProps) {
  return (
    <ContextMenuContent
      side={side}
      sideOffset={sideOffset}
      align={align}
      alignOffset={alignOffset}
      data-slot="context-menu-sub-content"
      {...props}
    />
  );
}

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof BaseContextMenu.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <BaseContextMenu.Item
      data-inset={inset}
      data-variant={variant}
      data-slot="context-menu-item"
      className={cn(
        "flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none cursor-default",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
        "data-[inset]:pl-8",
        "data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.CheckboxItem>) {
  return (
    <BaseContextMenu.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <BaseContextMenu.CheckboxItemIndicator>
          <CheckIcon className="size-3.5" />
        </BaseContextMenu.CheckboxItemIndicator>
      </span>
      {children}
    </BaseContextMenu.CheckboxItem>
  );
}

function ContextMenuRadioItem({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.RadioItem>) {
  return (
    <BaseContextMenu.RadioItem
      data-slot="context-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <BaseContextMenu.RadioItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </BaseContextMenu.RadioItemIndicator>
      </span>
      {children}
    </BaseContextMenu.RadioItem>
  );
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.GroupLabel> & {
  inset?: boolean;
}) {
  return (
    <BaseContextMenu.GroupLabel
      data-inset={inset}
      data-slot="context-menu-label"
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8 text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.Separator>) {
  return (
    <BaseContextMenu.Separator
      data-slot="context-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  );
}

function ContextMenuSubTrigger({
  children,
  className,
  inset,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.SubmenuTrigger> & {
  inset?: boolean;
}) {
  return (
    <BaseContextMenu.SubmenuTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none cursor-default",
        "focus:bg-accent focus:text-accent-foreground",
        "[&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "data-[inset]:pl-8",
        "data-[popup-open]:bg-accent data-[popup-open]:text-accent-foreground",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </BaseContextMenu.SubmenuTrigger>
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
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuPortal,
  ContextMenuBackdrop,
  ContextMenuPositioner,
  ContextMenuPopup,
  ContextMenuContent,
  ContextMenuArrow,
  ContextMenuGroup,
  ContextMenuLabel,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
};