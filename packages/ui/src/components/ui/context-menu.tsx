"use client";

import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "@lumi-ui/ui/lib/utils";
import { ArrowSvg } from "@lumi-ui/ui/arrow-svg";

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
  return (
    <BaseContextMenu.SubmenuRoot data-slot="context-menu-sub" {...props} />
  );
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
        align={align}
        alignOffset={alignOffset}
        className="max-h-(--available-height) outline-none"
        side={side}
        sideOffset={sideOffset}
        {...positionerProps}
      >
        <ContextMenuPopup
          className={cn(
            "py-1 bg-popover text-popover-foreground rounded-md outline outline-border dark:-outline-offset-1 shadow-md",
            "animate-popup",
            className,
          )}
          data-slot="context-menu-content"
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
      align={align}
      alignOffset={alignOffset}
      data-slot="context-menu-sub-content"
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  );
}

const contextItemVariants = cva(
  [
    "flex items-center gap-2 py-1.5 px-3.5 text-sm",
    "outline-none select-none cursor-default",
    "highlight-on-active",
    "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "[&_svg:not([class*='text-'])]:text-muted-foreground hover:[&_svg:not([class*='text-'])]:text-foreground",
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
        inset: "pl-8",
      },
    },
  },
);

type MenubarItemProps = React.ComponentProps<typeof BaseContextMenu.Item> &
  VariantProps<typeof contextItemVariants> & {
    unstyled?: boolean;
  };

function ContextMenuItem({
  className,
  variant = "default",
  unstyled,
  ...props
}: MenubarItemProps) {
  return (
    <BaseContextMenu.Item
      className={cn(
        unstyled ? "" : contextItemVariants({ variant }),
        className,
      )}
      data-slot="context-menu-item"
      data-variant={variant}
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
      checked={checked}
      className={cn(
        "flex items-center gap-2 py-1.5 pr-2 pl-8 text-sm",
        "outline-none select-none cursor-default",
        "highlight-on-active",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      data-slot="context-menu-checkbox-item"
      {...props}
    >
      <BaseContextMenu.CheckboxItemIndicator className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
        <CheckIcon className="size-3.5" />
      </BaseContextMenu.CheckboxItemIndicator>

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
      className={cn(
        "flex items-center gap-2 py-1.5 pr-2 pl-8 text-sm",
        "outline-none select-none cursor-default",
        "highlight-on-active",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      data-slot="context-menu-radio-item"
      {...props}
    >
      <BaseContextMenu.RadioItemIndicator className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
        <CircleIcon className="size-2.5 fill-current" />
      </BaseContextMenu.RadioItemIndicator>

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
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8 text-muted-foreground",
        className,
      )}
      data-inset={inset}
      data-slot="context-menu-label"
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
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      data-slot="context-menu-separator"
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
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      data-slot="context-menu-shortcut"
      {...props}
    />
  );
}

function ContextMenuSubTrigger({
  children,
  className,
  unstyled,
  variant = "default",
  ...props
}: React.ComponentProps<typeof BaseContextMenu.SubmenuTrigger> &
  VariantProps<typeof contextItemVariants> & {
    unstyled?: boolean;
  }) {
  return (
    <BaseContextMenu.SubmenuTrigger
      className={cn(
        unstyled ? "" : contextItemVariants({ variant }),
        className,
      )}
      data-slot="context-menu-sub-trigger"
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
