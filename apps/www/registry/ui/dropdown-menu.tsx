"use client";

import { Menu as BaseMenu } from "@base-ui/react/menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowSvg } from "@/registry/ui/arrow-svg";

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof BaseMenu.Root>) {
  return <BaseMenu.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof BaseMenu.Trigger>) {
  return <BaseMenu.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof BaseMenu.Portal>) {
  return <BaseMenu.Portal data-slot="dropdown-menu-portal" {...props} />;
}

function DropdownMenuBackdrop({
  ...props
}: React.ComponentProps<typeof BaseMenu.Backdrop>) {
  return <BaseMenu.Backdrop data-slot="dropdown-menu-backdrop" {...props} />;
}

function DropdownMenuPositioner({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.Positioner>) {
  return (
    <BaseMenu.Positioner
      className={cn(className)}
      data-slot="dropdown-menu-positioner"
      {...props}
    />
  );
}

function DropdownMenuPopup({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.Popup>) {
  return (
    <BaseMenu.Popup
      className={cn("relative", className)}
      data-slot="dropdown-menu-popup"
      {...props}
    />
  );
}

function DropdownMenuArrow({
  ...props
}: React.ComponentProps<typeof BaseMenu.Arrow>) {
  return (
    <BaseMenu.Arrow
      data-slot="dropdown-menu-arrow"
      className="data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180"
      {...props}
    >
      <ArrowSvg />
    </BaseMenu.Arrow>
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof BaseMenu.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <BaseMenu.Item
      data-inset={inset}
      data-variant={variant}
      data-slot="dropdown-menu-item"
      className={cn(
        "flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none cursor-default",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
        "data-[inset]:pl-8",
        "data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.Separator>) {
  return (
    <BaseMenu.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof BaseMenu.Group>) {
  return <BaseMenu.Group data-slot="dropdown-menu-group" {...props} />;
}

function DropdownMenuGroupLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof BaseMenu.GroupLabel> & {
  inset?: boolean;
}) {
  return (
    <BaseMenu.GroupLabel
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8 text-muted-foreground",
        className,
      )}
      data-slot="dropdown-menu-group-label"
      {...props}
    />
  );
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof BaseMenu.RadioGroup>) {
  return (
    <BaseMenu.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
  );
}

function DropdownMenuRadioItem({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.RadioItem>) {
  return (
    <BaseMenu.RadioItem
      className={cn(className)}
      {...props}
      data-slot="dropdown-menu-radio-item"
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.CheckboxItem>) {
  return (
    <BaseMenu.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(className)}
      {...props}
    />
  );
}

function DropdownMenuSubMenu({
  ...props
}: React.ComponentProps<typeof BaseMenu.SubmenuRoot>) {
  return <BaseMenu.SubmenuRoot data-slot="dropdown-menu-sub-menu" {...props} />;
}

function DropdownMenuSubMenuTrigger({
  children,
  className,
  inset,
  ...props
}: React.ComponentProps<typeof BaseMenu.SubmenuTrigger> & {
  inset?: boolean;
}) {
  return (
    <BaseMenu.SubmenuTrigger
      data-slot="dropdown-menu-sub-menu-trigger"
      data-inset={inset}
      className={cn(
        "flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none cursor-default",
        "focus:bg-accent focus:text-accent-foreground",
        "[&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "data-[inset]:pl-8",
        "data-[popup-open]:bg-accent data-[popup-open]:text-accent-foreground",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </BaseMenu.SubmenuTrigger>
  );
}


function DropdownMenuSubMenuContent({
  align = "start",
  side = "right",
  sideOffset = 0,
  alignOffset = 0,
  ...props
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuContent
      side={side}
      sideOffset={sideOffset}
      align={align}
      alignOffset={alignOffset}
      data-slot="dropdown-menu-sub-menu-content"
      {...props}
    />
  );
}

function DropdownMenuSubMenuTriggerGroup({
  children,
  className,
  inset,
  ...props
}: React.ComponentProps<typeof BaseMenu.SubmenuTrigger> & {
  inset?: boolean;
}) {
  return (
    <BaseMenu.SubmenuTrigger
      data-slot="dropdown-menu-sub-menu-trigger"
      data-inset={inset}
      className={cn(
        "flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none cursor-default",
        "focus:bg-accent focus:text-accent-foreground",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "data-[inset]:pl-8",
        "data-[popup-open]:bg-accent data-[popup-open]:text-accent-foreground",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </BaseMenu.SubmenuTrigger>
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

type DropdownMenuContentProps = React.ComponentProps<typeof BaseMenu.Popup> & {
  side?: BaseMenu.Positioner.Props["side"];
  sideOffset?: BaseMenu.Positioner.Props["sideOffset"];
  align?: BaseMenu.Positioner.Props["align"];
  alignOffset?: BaseMenu.Positioner.Props["alignOffset"];
  showArrow?: boolean;
  matchAnchorWidth?: boolean;
};

function DropdownMenuContent({
  children,
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 8,
  showArrow = false,
  matchAnchorWidth = true,
  ...props
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuPortal>
      <DropdownMenuPositioner
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        side={side}
        className={cn(
          matchAnchorWidth && "w-[var(--anchor-width)]",
          "max-h-(--available-height)",
        )}
      >
        <DropdownMenuPopup
          data-slot="dropdown-menu-content"
          className={cn(
            "p-1 bg-popover text-popover-foreground rounded-md",
            "shadow-md shadow-primary/10 outline dark:-outline-offset-1 outline-primary/10",
            "animate-popup",
            className,
          )}
          {...props}
        >
          {showArrow && <DropdownMenuArrow />}
          {children}
        </DropdownMenuPopup>
      </DropdownMenuPositioner>
    </DropdownMenuPortal>
  );
}

function DropdownMenuCheckboxItemContent({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof BaseMenu.CheckboxItem>) {
  return (
    <BaseMenu.CheckboxItem
      data-slot="dropdown-menu-checkbox-item-content"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <BaseMenu.CheckboxItemIndicator>
          <CheckIcon className="size-3.5" />
        </BaseMenu.CheckboxItemIndicator>
      </span>
      {children}
    </BaseMenu.CheckboxItem>
  );
}

function DropdownMenuRadioItemContent({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.RadioItem>) {
  return (
    <BaseMenu.RadioItem
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
      data-slot="dropdown-menu-radio-item-content"
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <BaseMenu.RadioItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </BaseMenu.RadioItemIndicator>
      </span>
      {children}
    </BaseMenu.RadioItem>
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuBackdrop,
  DropdownMenuPositioner,
  DropdownMenuPopup,
  DropdownMenuArrow,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSubMenu,
  DropdownMenuSubMenuTrigger,
  DropdownMenuShortcut,
  //
  DropdownMenuContent,
  DropdownMenuCheckboxItemContent,
  DropdownMenuRadioItemContent,
  DropdownMenuSubMenuTriggerGroup,
  DropdownMenuSubMenuContent,
};
