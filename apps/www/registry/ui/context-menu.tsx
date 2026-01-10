"use client";

import * as React from "react";
import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { ArrowSvg } from "@/registry/ui/arrow-svg";

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
            "animate-popup",
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
  sideOffset = -4,
  alignOffset = 0,
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
        "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-hidden select-none cursor-default",
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
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-md py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-md py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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
        "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-hidden select-none cursor-default",
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