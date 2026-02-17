"use client";

import { Menu as BaseMenu } from "@base-ui/react/menu";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "@/registry/lib/utils";
import { ArrowSvg } from "@/registry/ui/arrow-svg";

function DropdownMenu<Payload>({ ...props }: BaseMenu.Root.Props<Payload>) {
  return <BaseMenu.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuTrigger<Payload>({
  ...props
}: BaseMenu.Trigger.Props<Payload>) {
  return <BaseMenu.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function DropdownMenuPortal({ ...props }: BaseMenu.Portal.Props) {
  return <BaseMenu.Portal data-slot="dropdown-menu-portal" {...props} />;
}

function DropdownMenuBackdrop({
  className,
  ...props
}: BaseMenu.Backdrop.Props) {
  return (
    <BaseMenu.Backdrop
      className={cn("fixed inset-0", className)}
      data-slot="dropdown-menu-backdrop"
      {...props}
    />
  );
}

function DropdownMenuPositioner({
  className,
  ...props
}: BaseMenu.Positioner.Props) {
  return (
    <BaseMenu.Positioner
      className={cn("relative", className)}
      data-slot="dropdown-menu-positioner"
      {...props}
    />
  );
}

function DropdownMenuPopup({ className, ...props }: BaseMenu.Popup.Props) {
  return (
    <BaseMenu.Popup
      className={cn("relative", className)}
      data-slot="dropdown-menu-popup"
      {...props}
    />
  );
}

function DropdownMenuArrow({ ...props }: BaseMenu.Arrow.Props) {
  return (
    <BaseMenu.Arrow
      className="data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180"
      data-slot="dropdown-menu-arrow"
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
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground hover:[&_svg:not([class*='text-'])]:text-foreground",
  ],
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        default: "",
        destructive: [
          "text-destructive *:[svg]:!text-destructive",
          "data-[highlighted]:text-destructive data-[highlighted]:before:bg-destructive/10 dark:data-[highlighted]:before:bg-destructive/20",
        ],
      },
    },
  },
);

type DropdownMenuItemProps = BaseMenu.Item.Props &
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
      className={cn(
        unstyled ? "" : dropdownMenuItemVariants({ variant }),
        className,
      )}
      data-slot="dropdown-menu-item"
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: BaseMenu.Separator.Props) {
  return (
    <BaseMenu.Separator
      className={cn("bg-border pointer-events-none my-1 h-px", className)}
      data-slot="dropdown-menu-separator"
      {...props}
    />
  );
}

function DropdownMenuGroup({ ...props }: BaseMenu.Group.Props) {
  return <BaseMenu.Group data-slot="dropdown-menu-group" {...props} />;
}

function DropdownMenuGroupLabel({
  className,
  ...props
}: BaseMenu.GroupLabel.Props) {
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

function DropdownMenuRadioGroup({ ...props }: BaseMenu.RadioGroup.Props) {
  return (
    <BaseMenu.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
  );
}

function DropdownMenuRadioItem({
  children,
  className,
  ...props
}: BaseMenu.RadioItem.Props) {
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
}: BaseMenu.CheckboxItem.Props) {
  return (
    <BaseMenu.CheckboxItem
      className={cn(className)}
      data-slot="dropdown-menu-checkbox-item"
      {...props}
    />
  );
}

function DropdownMenuSubMenu({ ...props }: BaseMenu.SubmenuRoot.Props) {
  return <BaseMenu.SubmenuRoot data-slot="dropdown-menu-sub-menu" {...props} />;
}

function DropdownMenuSubMenuTrigger({
  className,
  ...props
}: BaseMenu.SubmenuTrigger.Props) {
  return (
    <BaseMenu.SubmenuTrigger
      className={cn("outline-hidden select-none cursor-default", className)}
      data-slot="dropdown-menu-sub-menu-trigger"
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
      align={align}
      alignOffset={alignOffset}
      data-slot="dropdown-menu-sub-menu-content"
      side={side}
      sideOffset={sideOffset}
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
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      data-slot="dropdown-menu-shortcut"
      {...props}
    />
  );
}

function DropdownMenuSubMenuTriggerGroup({
  children,
  className,
  ...props
}: BaseMenu.SubmenuTrigger.Props) {
  return (
    <BaseMenu.SubmenuTrigger
      className={cn(
        "flex items-center gap-2 py-1.5 px-3.5 text-sm",
        "outline-none select-none cursor-default",
        "highlight-on-active",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground hover:[&_svg:not([class*='text-'])]:text-foreground",
        className,
      )}
      data-slot="dropdown-menu-sub-menu-trigger"
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </BaseMenu.SubmenuTrigger>
  );
}

type DropdownMenuContentProps = BaseMenu.Popup.Props & {
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
        align={align}
        alignOffset={alignOffset}
        className={cn(
          matchAnchorWidth && "w-[var(--anchor-width)]",
          "max-h-(--available-height)",
        )}
        side={side}
        sideOffset={sideOffset}
      >
        <BaseMenu.Popup
          className={cn(
            "bg-popover text-popover-foreground rounded-md shadow-md py-1",
            "outline outline-border dark:-outline-offset-1",
            "animate-popup",
            className,
          )}
          data-slot="dropdown-menu-content"
          {...props}
        >
          {showArrow && <DropdownMenuArrow />}
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </DropdownMenuPortal>
  );
}

interface DropdownMenuCheckboxItemContentProps
  extends BaseMenu.CheckboxItem.Props {
  indicatorPlacement?: "start" | "end";
  indicatorIcon?: React.ReactNode;
}

function DropdownMenuCheckboxItemContent({
  className,
  children,
  checked,
  indicatorPlacement = "start",
  indicatorIcon = <CheckIcon className="size-4" />,
  ...props
}: DropdownMenuCheckboxItemContentProps) {
  return (
    <BaseMenu.CheckboxItem
      checked={checked}
      className={cn(
        "grid items-center gap-2 py-1.5 pr-3 pl-3.5 text-sm",
        "outline-none select-none cursor-default",
        "highlight-on-active",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        indicatorPlacement === "start" && "grid-cols-[1rem_1fr]",
        indicatorPlacement === "end" && "grid-cols-[1fr_1rem]",
        className,
      )}
      data-slot="dropdown-menu-checkbox-item-content"
      {...props}
    >
      <BaseMenu.CheckboxItemIndicator
        className={cn(
          "flex items-center justify-center row-start-1",
          "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          indicatorPlacement === "start" ? "col-start-1" : "col-start-2",
        )}
      >
        {indicatorIcon}
      </BaseMenu.CheckboxItemIndicator>
      <div
        className={cn(
          "flex items-center gap-2 row-start-1",
          indicatorPlacement === "start" ? "col-start-2" : "col-start-1",
        )}
      >
        {children}
      </div>
    </BaseMenu.CheckboxItem>
  );
}

interface DropdownMenuRadioItemContentProps extends BaseMenu.RadioItem.Props {
  indicatorPlacement?: "start" | "end";
  indicatorIcon?: React.ReactNode;
}

function DropdownMenuRadioItemContent({
  children,
  className,
  indicatorPlacement = "start",
  indicatorIcon = <CircleIcon className="size-2.5 fill-current" />,
  ...props
}: DropdownMenuRadioItemContentProps) {
  return (
    <BaseMenu.RadioItem
      className={cn(
        "grid items-center gap-2 py-1.5 pr-3 pl-3.5 text-sm",
        "outline-none select-none cursor-default",
        "highlight-on-active",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        indicatorPlacement === "start" && "grid-cols-[1rem_1fr]",
        indicatorPlacement === "end" && "grid-cols-[1fr_1rem]",
        className,
      )}
      data-slot="dropdown-menu-radio-item-content"
      {...props}
    >
      <BaseMenu.RadioItemIndicator
        className={cn(
          "flex items-center justify-center row-start-1",
          "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          indicatorPlacement === "start" ? "col-start-1" : "col-start-2",
        )}
      >
        {indicatorIcon}
      </BaseMenu.RadioItemIndicator>
      <div
        className={cn(
          "flex items-center gap-2 row-start-1",
          indicatorPlacement === "start" ? "col-start-2" : "col-start-1",
        )}
      >
        {children}
      </div>
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
