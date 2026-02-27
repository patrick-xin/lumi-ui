"use client";

import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "@/registry/lib/utils";
import { ArrowSvg } from "@/registry/ui/arrow-svg";

function ContextMenu(props: BaseContextMenu.Root.Props) {
  return <BaseContextMenu.Root data-slot="context-menu" {...props} />;
}

function ContextMenuTrigger({
  className,
  ...props
}: BaseContextMenu.Trigger.Props) {
  return (
    <BaseContextMenu.Trigger
      className={className}
      data-slot="context-menu-trigger"
      {...props}
    />
  );
}

function ContextMenuPortal({
  className,
  ...props
}: BaseContextMenu.Portal.Props) {
  return (
    <BaseContextMenu.Portal
      className={className}
      data-slot="context-menu-portal"
      {...props}
    />
  );
}

function ContextMenuBackdrop({
  className,
  ...props
}: BaseContextMenu.Backdrop.Props) {
  return (
    <BaseContextMenu.Backdrop
      className={cn("fixed inset-0", className)}
      data-slot="context-menu-backdrop"
      {...props}
    />
  );
}

function ContextMenuPositioner({
  className,
  ...props
}: BaseContextMenu.Positioner.Props) {
  return (
    <BaseContextMenu.Positioner
      className={cn("relative", className)}
      data-slot="context-menu-positioner"
      {...props}
    />
  );
}

function ContextMenuPopup({
  className,
  ...props
}: BaseContextMenu.Popup.Props) {
  return (
    <BaseContextMenu.Popup
      className={cn("relative", className)}
      data-slot="context-menu-popup"
      {...props}
    />
  );
}

function ContextMenuArrow({
  className,
  ...props
}: BaseContextMenu.Arrow.Props) {
  return (
    <BaseContextMenu.Arrow
      className={cn(
        "data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180",
        className,
      )}
      data-slot="context-menu-arrow"
      {...props}
    >
      <ArrowSvg />
    </BaseContextMenu.Arrow>
  );
}

function ContextMenuGroup({
  className,
  ...props
}: BaseContextMenu.Group.Props) {
  return (
    <BaseContextMenu.Group
      className={className}
      data-slot="context-menu-group"
      {...props}
    />
  );
}

function ContextMenuRadioGroup({
  className,
  ...props
}: BaseContextMenu.RadioGroup.Props) {
  return (
    <BaseContextMenu.RadioGroup
      className={className}
      data-slot="context-menu-radio-group"
      {...props}
    />
  );
}

const contextMenuItemVariants = cva(
  [
    "flex items-center gap-2 py-1.5 px-3.5 text-sm",
    "outline-none select-none cursor-default",
    "highlight-on-active",
    "data-disabled:opacity-50 data-disabled:pointer-events-none",
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

type ContextMenuItemProps = BaseContextMenu.Item.Props &
  VariantProps<typeof contextMenuItemVariants> & {
    unstyled?: boolean;
  };

function ContextMenuItem({
  className,
  variant = "default",
  unstyled = false,
  ...props
}: ContextMenuItemProps) {
  return (
    <BaseContextMenu.Item
      className={cn(
        unstyled ? "" : contextMenuItemVariants({ variant }),
        className,
      )}
      data-slot="context-menu-item"
      {...props}
    />
  );
}

type ContextMenuLinkItemProps = BaseContextMenu.LinkItem.Props &
  VariantProps<typeof contextMenuItemVariants> & {
    unstyled?: boolean;
  };

function ContextMenuLinkItem({
  className,
  variant = "default",
  unstyled = false,
  ...props
}: ContextMenuLinkItemProps) {
  return (
    <BaseContextMenu.LinkItem
      className={cn(
        unstyled ? "" : contextMenuItemVariants({ variant }),
        className,
      )}
      data-slot="context-menu-link-item"
      {...props}
    />
  );
}

function ContextMenuSeparator({
  className,
  ...props
}: BaseContextMenu.Separator.Props) {
  return (
    <BaseContextMenu.Separator
      className={cn("bg-border pointer-events-none my-1 h-px", className)}
      data-slot="context-menu-separator"
      {...props}
    />
  );
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: BaseContextMenu.GroupLabel.Props & {
  inset?: boolean;
}) {
  return (
    <BaseContextMenu.GroupLabel
      className={cn(
        "px-3.5 py-1.5 text-xs text-muted-foreground font-medium select-none data-inset:pl-8",
        className,
      )}
      data-inset={inset}
      data-slot="context-menu-label"
      {...props}
    />
  );
}

function ContextMenuCheckboxItem({
  className,
  ...props
}: BaseContextMenu.CheckboxItem.Props) {
  return (
    <BaseContextMenu.CheckboxItem
      className={cn(className)}
      data-slot="context-menu-checkbox-item"
      {...props}
    />
  );
}

function ContextMenuRadioItem({
  className,
  ...props
}: BaseContextMenu.RadioItem.Props) {
  return (
    <BaseContextMenu.RadioItem
      className={className}
      data-slot="context-menu-radio-item"
      {...props}
    />
  );
}

function ContextMenuSub(props: BaseContextMenu.SubmenuRoot.Props) {
  return (
    <BaseContextMenu.SubmenuRoot data-slot="context-menu-sub" {...props} />
  );
}

function ContextMenuSubTrigger({
  className,
  ...props
}: BaseContextMenu.SubmenuTrigger.Props) {
  return (
    <BaseContextMenu.SubmenuTrigger
      className={className}
      data-slot="context-menu-sub-trigger"
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

type ContextMenuContentProps = BaseContextMenu.Popup.Props & {
  side?: BaseContextMenu.Positioner.Props["side"];
  sideOffset?: BaseContextMenu.Positioner.Props["sideOffset"];
  align?: BaseContextMenu.Positioner.Props["align"];
  alignOffset?: BaseContextMenu.Positioner.Props["alignOffset"];
  showArrow?: boolean;
  matchAnchorWidth?: boolean;
};

function ContextMenuContent({
  children,
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  showArrow = false,
  matchAnchorWidth = false,
  ...props
}: ContextMenuContentProps) {
  return (
    <BaseContextMenu.Portal>
      <BaseContextMenu.Positioner
        align={align}
        alignOffset={alignOffset}
        className={cn(
          matchAnchorWidth && "w-[var(--anchor-width)]",
          "max-h-(--available-height)",
        )}
        data-slot="context-menu-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <BaseContextMenu.Popup
          className={cn(
            "bg-popover text-popover-foreground rounded-md shadow-md py-1",
            "overlay-outline animate-popup",
            className,
          )}
          data-slot="context-menu-content"
          {...props}
        >
          {showArrow && <ContextMenuArrow />}
          {children}
        </BaseContextMenu.Popup>
      </BaseContextMenu.Positioner>
    </BaseContextMenu.Portal>
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

interface ContextMenuCheckboxItemContentProps
  extends BaseContextMenu.CheckboxItem.Props {
  indicatorPlacement?: "start" | "end";
  indicatorIcon?: React.ReactNode;
}

function ContextMenuCheckboxItemContent({
  className,
  children,
  checked,
  indicatorPlacement = "start",
  indicatorIcon = <CheckIcon className="size-4" />,
  ...props
}: ContextMenuCheckboxItemContentProps) {
  return (
    <BaseContextMenu.CheckboxItem
      checked={checked}
      className={cn(
        "grid items-center gap-2 py-1.5 pr-3 pl-3.5 text-sm",
        "outline-none select-none cursor-default",
        "highlight-on-active",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        indicatorPlacement === "start" && "grid-cols-[1rem_1fr]",
        indicatorPlacement === "end" && "grid-cols-[1fr_1rem]",
        className,
      )}
      data-slot="context-menu-checkbox-item-content"
      {...props}
    >
      <BaseContextMenu.CheckboxItemIndicator
        className={cn(
          "flex items-center justify-center row-start-1",
          "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          indicatorPlacement === "start" ? "col-start-1" : "col-start-2",
        )}
      >
        {indicatorIcon}
      </BaseContextMenu.CheckboxItemIndicator>
      <div
        className={cn(
          "flex items-center gap-2 row-start-1",
          indicatorPlacement === "start" ? "col-start-2" : "col-start-1",
        )}
      >
        {children}
      </div>
    </BaseContextMenu.CheckboxItem>
  );
}

interface ContextMenuRadioItemContentProps
  extends BaseContextMenu.RadioItem.Props {
  indicatorPlacement?: "start" | "end";
  indicatorIcon?: React.ReactNode;
}

function ContextMenuRadioItemContent({
  children,
  className,
  indicatorPlacement = "start",
  indicatorIcon = <CircleIcon className="size-2.5 fill-current" />,
  ...props
}: ContextMenuRadioItemContentProps) {
  return (
    <BaseContextMenu.RadioItem
      className={cn(
        "grid items-center gap-2 py-1.5 pr-3 pl-2 text-sm",
        "outline-none select-none cursor-default",
        "highlight-on-active",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        indicatorPlacement === "start" && "grid-cols-[1rem_1fr]",
        indicatorPlacement === "end" && "grid-cols-[1fr_1rem] pl-4",
        className,
      )}
      data-slot="context-menu-radio-item-content"
      {...props}
    >
      <BaseContextMenu.RadioItemIndicator
        className={cn(
          "flex items-center justify-center row-start-1",
          "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          indicatorPlacement === "start" ? "col-start-1" : "col-start-2",
        )}
      >
        {indicatorIcon}
      </BaseContextMenu.RadioItemIndicator>
      <div
        className={cn(
          "flex items-center gap-2 row-start-1",
          indicatorPlacement === "start" ? "col-start-2" : "col-start-1",
        )}
      >
        {children}
      </div>
    </BaseContextMenu.RadioItem>
  );
}

function ContextMenuSubTriggerGroup({
  children,
  className,
  variant = "default",
  unstyled = false,
  ...props
}: BaseContextMenu.SubmenuTrigger.Props &
  VariantProps<typeof contextMenuItemVariants> & {
    unstyled?: boolean;
  }) {
  return (
    <BaseContextMenu.SubmenuTrigger
      className={cn(
        unstyled ? "" : contextMenuItemVariants({ variant }),
        className,
      )}
      data-slot="context-menu-sub-trigger-group"
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
  ContextMenuArrow,
  ContextMenuGroup,
  ContextMenuLabel,
  ContextMenuItem,
  ContextMenuLinkItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  // Composite components
  ContextMenuContent,
  ContextMenuCheckboxItemContent,
  ContextMenuRadioItemContent,
  ContextMenuSubTriggerGroup,
  ContextMenuSubContent,
};
