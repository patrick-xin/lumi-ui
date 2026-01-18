"use client";

import * as React from "react";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { ArrowSvg } from "@lumi-ui/ui/arrow-svg";

import { cn } from "@lumi-ui/ui/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

function Menubar({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenubar>) {
  return (
    <BaseMenubar
      data-slot="menubar"
      className={cn(
        "bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs",
        className,
      )}
      {...props}
    />
  );
}

function MenubarMenu({ ...props }: React.ComponentProps<typeof BaseMenu.Root>) {
  return <BaseMenu.Root data-slot="menubar-menu" {...props} />;
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof BaseMenu.Portal>) {
  return <BaseMenu.Portal data-slot="menubar-portal" {...props} />;
}

function MenubarBackdrop({
  ...props
}: React.ComponentProps<typeof BaseMenu.Backdrop>) {
  return <BaseMenu.Backdrop data-slot="menubar-backdrop" {...props} />;
}

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.Trigger>) {
  return (
    <BaseMenu.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "flex items-center rounded-md px-2 py-1 text-sm font-medium outline-none select-none",
        "focus-visible:bg-accent focus-visible:text-accent-foreground",
        "data-[popup-open]:bg-accent data-[popup-open]:text-accent-foreground",
        "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
        className,
      )}
      {...props}
    />
  );
}

function MenubarPositioner({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.Positioner>) {
  return (
    <BaseMenu.Positioner
      className={cn("relative", className)}
      data-slot="menubar-positioner"
      {...props}
    />
  );
}

function MenubarPopup({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.Popup>) {
  return (
    <BaseMenu.Popup
      className={cn("relative", className)}
      data-slot="menubar-popup"
      {...props}
    />
  );
}

function MenubarArrow({
  ...props
}: React.ComponentProps<typeof BaseMenu.Arrow>) {
  return (
    <BaseMenu.Arrow
      data-slot="menubar-arrow"
      className="data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180"
      {...props}
    >
      <ArrowSvg />
    </BaseMenu.Arrow>
  );
}

const menubarItemVariants = cva(
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

type MenubarItemProps = React.ComponentProps<typeof BaseMenu.Item> &
  VariantProps<typeof menubarItemVariants> & {
    unstyled?: boolean;
  };

function MenubarItem({
  className,
  variant = "default",
  unstyled = false,
  ...props
}: MenubarItemProps) {
  return (
    <BaseMenu.Item
      data-slot="menubar-item"
      className={cn(
        unstyled ? "" : menubarItemVariants({ variant }),
        className
      )}
      {...props}
    />
  );
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.Separator>) {
  return (
    <BaseMenu.Separator
      data-slot="menubar-separator"
      className={cn("bg-border my-1 h-px", className)}
      {...props}
    />
  );
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof BaseMenu.Group>) {
  return <BaseMenu.Group data-slot="menubar-group" {...props} />;
}

function MenubarGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.GroupLabel>) {
  return (
    <BaseMenu.GroupLabel
      data-slot="menubar-group-label"
      className={cn(
        "px-3 py-1 text-xs text-muted-foreground font-medium",
        className,
      )}
      {...props}
    />
  );
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof BaseMenu.RadioGroup>) {
  return (
    <BaseMenu.RadioGroup data-slot="menubar-radio-group" {...props} />
  );
}

function MenubarRadioItem({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.RadioItem>) {
  return (
    <BaseMenu.RadioItem
      data-slot="menubar-radio-item"
      className={cn(className)}
      {...props}
    />
  );
}

function MenubarCheckboxItem({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.CheckboxItem>) {
  return (
    <BaseMenu.CheckboxItem
      data-slot="menubar-checkbox-item"
      className={cn(className)}
      {...props}
    />
  );
}

function MenubarSubMenu({
  ...props
}: React.ComponentProps<typeof BaseMenu.SubmenuRoot>) {
  return <BaseMenu.SubmenuRoot data-slot="menubar-sub-menu" {...props} />;
}

function MenubarSubMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseMenu.SubmenuTrigger>) {
  return (
    <BaseMenu.SubmenuTrigger
      data-slot="menubar-sub-menu-trigger"
      className={cn(
        "flex items-center gap-2 py-1.5 px-3.5 text-sm",
        "outline-none select-none cursor-default",
        "highlight-on-active",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground hover:[&_svg:not([class*='text-'])]:text-foreground",
        "data-[inset]:pl-8",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </BaseMenu.SubmenuTrigger>
  );
}

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

type MenubarContentProps = React.ComponentProps<typeof BaseMenu.Popup> & {
  side?: BaseMenu.Positioner.Props["side"];
  sideOffset?: BaseMenu.Positioner.Props["sideOffset"];
  align?: BaseMenu.Positioner.Props["align"];
  alignOffset?: BaseMenu.Positioner.Props["alignOffset"];
  showArrow?: boolean;
  matchAnchorWidth?: boolean;
};


function MenubarContent({
  children,
  className,
  align = "start",
  alignOffset = -4,
  side = "bottom",
  sideOffset = 8,
  showArrow = false,
  matchAnchorWidth = false,
  ...props
}: MenubarContentProps) {
  return (
    <MenubarPortal>
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
          data-slot="menubar-content"
          className={cn(
            "bg-popover text-popover-foreground rounded-md shadow-md py-1",
            "outline-1 outline-border dark:-outline-offset-1",
            "animate-popup",
            "min-w-48",
            className,
          )}
          {...props}
        >
          {showArrow && <MenubarArrow />}
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </MenubarPortal>
  );
}

function MenubarSubMenuContent({
  align = "start",
  side = "right",
  sideOffset = -4,
  alignOffset = 0,
  ...props
}: MenubarContentProps) {
  return (
    <MenubarContent
      side={side}
      sideOffset={sideOffset}
      align={align}
      alignOffset={alignOffset}
      data-slot="menubar-sub-menu-content"
      {...props}
    />
  );
}

function MenubarCheckboxItemContent({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof BaseMenu.CheckboxItem>) {
  return (
    <BaseMenu.CheckboxItem
      data-slot="menubar-checkbox-item-content"
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

function MenubarRadioItemContent({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.RadioItem>) {
  return (
    <BaseMenu.RadioItem
      data-slot="menubar-radio-item-content"
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

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarPortal,
  MenubarBackdrop,
  MenubarPositioner,
  MenubarPopup,
  MenubarArrow,
  MenubarItem,
  MenubarSeparator,
  MenubarGroup,
  MenubarGroupLabel,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarCheckboxItem,
  MenubarSubMenu,
  MenubarSubMenuTrigger,
  MenubarShortcut,
  // Composite components
  MenubarContent,
  MenubarSubMenuContent,
  MenubarCheckboxItemContent,
  MenubarRadioItemContent,
};