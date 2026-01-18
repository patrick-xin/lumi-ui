"use client";

import * as React from "react";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { ArrowSvg } from "@lumi-ui/ui/arrow-svg";

import { cn } from "@lumi-ui/ui/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

function DropdownMenu<Payload>({
  ...props
}: React.ComponentProps<typeof BaseMenu.Root<Payload>>) {
  return <BaseMenu.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuTrigger<Payload>({
  ...props
}: React.ComponentProps<typeof BaseMenu.Trigger<Payload>>) {
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
      className={cn("relative", className)}
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


const dropdownMenuItemVariants = cva(
  [
    "flex items-center gap-2 py-1.5 px-3.5 text-sm",
    "outline-none select-none cursor-default",
    "highlight-on-active",
    "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "[&_svg:not([class*='text-'])]:text-muted-foreground hover:[&_svg:not([class*='text-'])]:text-foreground",
  ],
  {
    variants: {
      variant: {
        default: "",
        destructive: [
          "text-destructive *:[svg]:!text-destructive",
          "data-[highlighted]:text-destructive data-[highlighted]:before:bg-destructive/10 dark:data-[highlighted]:before:bg-destructive/20",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type DropdownMenuItemProps = React.ComponentProps<typeof BaseMenu.Item> &
  VariantProps<typeof dropdownMenuItemVariants> & {
    unstyled?: boolean;
  };

function DropdownMenuItem({
  className,
  variant = "default",
  unstyled = false,
  ...props
}: DropdownMenuItemProps) {
  return (
    <BaseMenu.Item
      data-slot="dropdown-menu-item"
       className={cn(
        unstyled ? "" : dropdownMenuItemVariants({ variant }),
        className
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
      className={cn("bg-border my-1 h-px", className)}
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
  ...props
}: React.ComponentProps<typeof BaseMenu.GroupLabel>) {
  return (
    <BaseMenu.GroupLabel
      className={cn(
        "px-3 py-1 text-xs text-muted-foreground font-medium",
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
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.SubmenuTrigger>) {
  return (
    <BaseMenu.SubmenuTrigger
      data-slot="dropdown-menu-sub-menu-trigger"
      className={cn("outline-hidden select-none cursor-default", className)}
      {...props}
    />
  );
}

function DropdownMenuSubMenuContent({
  align = "start",
  side = "right",
  sideOffset = -4,
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

function DropdownMenuSubMenuTriggerGroup({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.SubmenuTrigger>) {
  return (
    <BaseMenu.SubmenuTrigger
      data-slot="dropdown-menu-sub-menu-trigger"
      className={cn(
        "flex items-center gap-2 py-1.5 px-3.5 text-sm",
        "outline-none select-none cursor-default",
        "highlight-on-active",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground hover:[&_svg:not([class*='text-'])]:text-foreground",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </BaseMenu.SubmenuTrigger>
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
      <BaseMenu.Positioner
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        side={side}
        className={cn(
          matchAnchorWidth && "w-[var(--anchor-width)]",
          "max-h-(--available-height)",
        )}
      >
        <BaseMenu.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            "bg-popover text-popover-foreground rounded-md shadow-md py-1",
            "outline outline-1 outline-border dark:-outline-offset-1",
            "animate-popup",
            className,
          )}
          {...props}
        >
          {showArrow && <DropdownMenuArrow />}
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
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
        "flex items-center gap-2 py-1.5 pr-2 pl-8 text-sm",
        "outline-none select-none cursor-default",
        "highlight-on-active",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      checked={checked}
      {...props}
    >
      <BaseMenu.CheckboxItemIndicator className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
        <CheckIcon className="size-4" />
      </BaseMenu.CheckboxItemIndicator>
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
      data-slot="dropdown-menu-radio-item-content"
      className={cn(
        "flex items-center gap-2 py-1.5 pr-2 pl-8 text-sm",
        "outline-none select-none cursor-default",
        "highlight-on-active",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <BaseMenu.RadioItemIndicator className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
        <CircleIcon className="size-2.5 fill-current" />
      </BaseMenu.RadioItemIndicator>
      {children}
    </BaseMenu.RadioItem>
  );
}

const createDropdownMenuHandle = BaseMenu.createHandle;

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
  createDropdownMenuHandle,
  // Composite components
  DropdownMenuContent,
  DropdownMenuCheckboxItemContent,
  DropdownMenuRadioItemContent,
  DropdownMenuSubMenuTriggerGroup,
  DropdownMenuSubMenuContent,
};
