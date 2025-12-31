"use client";

import * as React from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { ArrowSvg } from "@/registry/ui/arrow-svg";

import { cn } from "@/lib/utils";

function Select<Value, Multiple extends boolean | undefined = false>(
  props: BaseSelect.Root.Props<Value, Multiple>,
): React.JSX.Element {
  return <BaseSelect.Root {...props} />;
}

function SelectTrigger({
  children,
  ...props
}: React.ComponentProps<typeof BaseSelect.Trigger>) {
  return (
    <BaseSelect.Trigger
      data-slot="select-trigger"
      {...props}
    >
      {children}
    </BaseSelect.Trigger>
  );
}

function SelectValue({
  className,
  placeholder,
  children,
  ...props
}: React.ComponentProps<typeof BaseSelect.Value> & {
  placeholder?: string;
}) {
  return (
    <BaseSelect.Value
      data-slot="select-value"
      data-placeholder-text={placeholder}
      className={cn(
        "flex items-center gap-2 line-clamp-1 data-[placeholder]:text-muted-foreground data-[placeholder]:before:content-[attr(data-placeholder-text)]",
        className,
      )}
      {...props}
    >
      {children}
    </BaseSelect.Value>
  );
}

function SelectIcon({
  className,
  ...props
}: React.ComponentProps<typeof BaseSelect.Icon>) {
  return (
    <BaseSelect.Icon
      data-slot="select-icon"
      className={cn("pointer-events-none", className)}
      {...props}
    />
  );
}

function SelectBackdrop({
  ...props
}: React.ComponentProps<typeof BaseSelect.Backdrop>) {
  return (
    <BaseSelect.Backdrop
      data-slot="select-backdrop"
      {...props}
    />
  );
}

function SelectPortal({
  ...props
}: React.ComponentProps<typeof BaseSelect.Portal>) {
  return (
    <BaseSelect.Portal
      data-slot="select-portal"
      {...props}
    />
  );
}

function SelectPositioner({
  alignItemWithTrigger,
  ...props
}: React.ComponentProps<typeof BaseSelect.Positioner>) {
  return (
    <BaseSelect.Positioner
      data-slot="select-positioner"
      alignItemWithTrigger={alignItemWithTrigger}
      {...props}
    />
  );
}

function SelectPopup({
  ...props
}: React.ComponentProps<typeof BaseSelect.Popup>) {
  return (
    <BaseSelect.Popup
      data-slot="select-popup"
      {...props}
    />
  );
}

function SelectList({
  ...props
}: React.ComponentProps<typeof BaseSelect.List>) {
  return (
    <BaseSelect.List
      data-slot="select-list"
      {...props}
    />
  );
}

function SelectArrow({
  ...props
}: React.ComponentProps<typeof BaseSelect.Arrow>) {
  return (
    <BaseSelect.Arrow
      data-slot="select-arrow"
      {...props}
    >
      <ArrowSvg variant="popover"/>
    </BaseSelect.Arrow>
  );
}

function SelectItem({
  children,
  ...props
}: React.ComponentProps<typeof BaseSelect.Item>) {
  return (
    <BaseSelect.Item
      data-slot="select-item"
      {...props}
    >
     {children}
    </BaseSelect.Item>
  );
}


function SelectItemText({
  ...props
}: React.ComponentProps<typeof BaseSelect.ItemText>) {
  return (
    <BaseSelect.ItemText
      data-slot="select-item-text"
      {...props}
    />
  );
}

function SelectItemIndicator({
  ...props
}: React.ComponentProps<typeof BaseSelect.ItemIndicator>) {
  return (
    <BaseSelect.ItemIndicator
      data-slot="select-item-indicator"
      {...props}
    />
  );
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof BaseSelect.Group>) {
  return <BaseSelect.Group data-slot="select-group" {...props} />;
}

function SelectGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof BaseSelect.GroupLabel>) {
  return (
    <BaseSelect.GroupLabel
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof BaseSelect.Separator>) {
  return (
    <BaseSelect.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof BaseSelect.ScrollUpArrow>) {
  return (
    <BaseSelect.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-1 flex h-7 w-full cursor-default items-center justify-center rounded-md bg-popover text-center text-xs before:absolute data-[side=none]:before:-top-full before:left-0 before:h-full before:w-full before:content-['']",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </BaseSelect.ScrollUpArrow>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof BaseSelect.ScrollDownArrow>) {
  return (
    <BaseSelect.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-1 flex h-7 w-full cursor-default items-center justify-center rounded-md bg-popover text-center text-xs before:absolute data-[side=none]:before:-bottom-full before:left-0 before:h-full before:w-full before:content-['']",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </BaseSelect.ScrollDownArrow>
  );
}

type SelectTriggerGroupProps = Omit<
  React.ComponentProps<typeof BaseSelect.Trigger>,
  "children"
> & {
  size?: "default" | "sm";
  icon?: React.ReactNode;
  iconPlacement?: "left" | "right";
  placeholder?: string;
  children?: React.ComponentProps<typeof BaseSelect.Value>["children"];
};

function SelectTriggerGroup({
  className,
  children,
  size = "default",
  icon,
  iconPlacement = "right",
  placeholder,
  ...props
}: SelectTriggerGroupProps) {
  return (
    <BaseSelect.Trigger
      data-size={size}
      className={cn(
        "group flex items-center gap-2 min-w-40 dark:bg-input/30 dark:hover:bg-input/50 ",
        "rounded-md border border-input bg-transparent py-2 text-sm shadow-xs transition-[color,box-shadow]",
        "outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        "[&>span[data-slot='select-value']]:flex-1 [&>span[data-slot='select-value']]:text-left [&>span[data-slot='select-value']]:truncate [&>span[data-slot='select-value']]:min-w-0",
        "dark:data-[popup-open]:bg-input/50",
        "data-[size=default]:h-9 data-[size=sm]:h-8",
        iconPlacement === "left" ? "px-2" : "px-3",
        className,
      )}
      {...props}
    >
      <BaseSelect.Value
      data-slot="select-value"
      data-placeholder-text={placeholder}
      className="flex flex-1 items-center gap-2 truncate line-clamp-1 data-[placeholder]:text-muted-foreground data-[placeholder]:before:content-[attr(data-placeholder-text)]"
      >
      {children}
      </BaseSelect.Value>
      {
        <BaseSelect.Icon
          data-slot="select-icon"
          className={cn(
            "flex-none shrink-0 pointer-events-none",
            "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:opacity-50 [&_svg]:transition-all",
            iconPlacement === "left" && "-order-1",
          )}
        >
          {icon || <ChevronDownIcon />}
        </BaseSelect.Icon>
      }
    </BaseSelect.Trigger>
  );
}

function SelectContent({
  className,
  children,
  side = "bottom",
  align = "start",
  sideOffset = 4,
  alignOffset = 0,
  alignItemWithTrigger = false,
  ...props
}: React.ComponentProps<typeof BaseSelect.Popup> &
  Pick<
    React.ComponentProps<typeof BaseSelect.Positioner>,
    "side" | "sideOffset" | "align" | "alignOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPortal>
      <BaseSelect.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
      >
        <BaseSelect.Popup
          data-slot="select-content"
          className={cn(
            "bg-popover text-popover-foreground rounded-sm shadow-md",
            "overflow-hidden",
            "outline outline-1 outline-border dark:-outline-offset-1",
            "max-h-[var(--available-height)]  min-w-[var(--anchor-width)]",
            "animate-popup",
            "data-[side=none]:data-[ending-style]:transition-none data-[side=none]:data-[starting-style]:transition-none data-[side=none]:data-[starting-style]:scale-100 data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:min-w-[calc(var(--anchor-width)+0.3rem)]",
            className,
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <BaseSelect.List className="relative py-1 scroll-py-6 overflow-y-auto max-h-[min(24rem,var(--available-height))]">
            {children}
          </BaseSelect.List>
          <SelectScrollDownButton />
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </SelectPortal>
  );
}

interface SelectItemContentProps
  extends React.ComponentProps<typeof BaseSelect.Item> {
  indicatorPlacement?: "start" | "end";
  indicatorIcon?: React.ReactNode;
}

function SelectItemContent({
  className,
  children,
  indicatorPlacement = "end",
  indicatorIcon = <CheckIcon />,
  ...props
}: SelectItemContentProps) {
  return (
    <BaseSelect.Item
      data-slot="select-item"
      className={cn(
        "grid items-center gap-2 py-1.5 pl-3.5 text-sm",
        "outline-none select-none cursor-default",
        "data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:before:bg-accent data-[highlighted]:text-accent-foreground data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        indicatorPlacement === "start" && "grid-cols-[1rem_1fr] pr-8",
        indicatorPlacement === "end" && "grid-cols-[1fr_1rem] pr-3",
        className,
      )}
      {...props}
    >
      <BaseSelect.ItemIndicator
        data-slot="select-item-indicator"
        className={cn(
          "flex items-center justify-center row-start-1",
          "[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
          indicatorPlacement === "start" ? "col-start-1" : "col-start-2",
        )}
      >
        {indicatorIcon}
      </BaseSelect.ItemIndicator>

        <BaseSelect.ItemText    className={cn(
          "flex items-center gap-2 row-start-1",
          indicatorPlacement === "start" ? "col-start-2" : "col-start-1",
        )}>
          {children}
        </BaseSelect.ItemText>
    </BaseSelect.Item>
  );
}

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectBackdrop,
  SelectPortal,
  SelectPositioner,
  SelectPopup,
  SelectList,
  SelectArrow,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
  SelectGroup,
  SelectGroupLabel,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectSeparator,
  // Composite components
  SelectTriggerGroup,
  SelectContent,
  SelectItemContent
};
