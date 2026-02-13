"use client";

import { Select as BaseSelect } from "@base-ui/react/select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "@/registry/lib/utils";
import { ArrowSvg } from "@/registry/ui/arrow-svg";

function Select<Value, Multiple extends boolean | undefined = false>(
  props: BaseSelect.Root.Props<Value, Multiple>,
): React.JSX.Element {
  return <BaseSelect.Root {...props} />;
}

function SelectTrigger({
  children,
  className,
  ...props
}: BaseSelect.Trigger.Props) {
  return (
    <BaseSelect.Trigger
      className={cn(
        "pointer-coarse:after:absolute pointer-coarse:after:min-h-10 pointer-coarse:after:min-w-10",
        className,
      )}
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
}: BaseSelect.Value.Props & {
  placeholder?: string;
}) {
  return (
    <BaseSelect.Value
      className={cn(
        "flex items-center gap-2 line-clamp-1 data-[placeholder]:text-muted-foreground data-[placeholder]:before:content-[attr(data-placeholder-text)]",
        className,
      )}
      data-placeholder-text={placeholder}
      data-slot="select-value"
      {...props}
    >
      {children}
    </BaseSelect.Value>
  );
}

function SelectIcon({ className, ...props }: BaseSelect.Icon.Props) {
  return (
    <BaseSelect.Icon
      className={cn("pointer-events-none", className)}
      data-slot="select-icon"
      {...props}
    />
  );
}

function SelectBackdrop({ ...props }: BaseSelect.Backdrop.Props) {
  return <BaseSelect.Backdrop data-slot="select-backdrop" {...props} />;
}

function SelectPortal({ ...props }: BaseSelect.Portal.Props) {
  return <BaseSelect.Portal data-slot="select-portal" {...props} />;
}

function SelectPositioner({
  alignItemWithTrigger,
  ...props
}: BaseSelect.Positioner.Props) {
  return (
    <BaseSelect.Positioner
      alignItemWithTrigger={alignItemWithTrigger}
      data-slot="select-positioner"
      {...props}
    />
  );
}

function SelectPopup({ ...props }: BaseSelect.Popup.Props) {
  return <BaseSelect.Popup data-slot="select-popup" {...props} />;
}

function SelectList({ ...props }: BaseSelect.List.Props) {
  return <BaseSelect.List data-slot="select-list" {...props} />;
}

function SelectArrow({ ...props }: BaseSelect.Arrow.Props) {
  return (
    <BaseSelect.Arrow data-slot="select-arrow" {...props}>
      <ArrowSvg variant="popover" />
    </BaseSelect.Arrow>
  );
}

function SelectItem({ children, ...props }: BaseSelect.Item.Props) {
  return (
    <BaseSelect.Item data-slot="select-item" {...props}>
      {children}
    </BaseSelect.Item>
  );
}

function SelectItemText({ ...props }: BaseSelect.ItemText.Props) {
  return <BaseSelect.ItemText data-slot="select-item-text" {...props} />;
}

function SelectItemIndicator({ ...props }: BaseSelect.ItemIndicator.Props) {
  return (
    <BaseSelect.ItemIndicator data-slot="select-item-indicator" {...props} />
  );
}

function SelectGroup({ ...props }: BaseSelect.Group.Props) {
  return <BaseSelect.Group data-slot="select-group" {...props} />;
}

function SelectGroupLabel({
  className,
  ...props
}: BaseSelect.GroupLabel.Props) {
  return (
    <BaseSelect.GroupLabel
      className={cn(
        "px-3.5 py-1.5 text-xs text-muted-foreground font-medium",
        className,
      )}
      data-slot="select-label"
      {...props}
    />
  );
}

function SelectSeparator({ className, ...props }: BaseSelect.Separator.Props) {
  return (
    <BaseSelect.Separator
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      data-slot="select-separator"
      {...props}
    />
  );
}

function SelectScrollUpArrow({
  className,
  ...props
}: BaseSelect.ScrollUpArrow.Props) {
  return (
    <BaseSelect.ScrollUpArrow
      className={cn(
        "top-0 z-1 flex h-7 w-full cursor-default items-center justify-center rounded-md bg-popover text-center text-xs before:absolute data-[side=none]:before:-top-full before:left-0 before:h-full before:w-full before:content-['']",
        className,
      )}
      data-slot="select-scroll-up-button"
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </BaseSelect.ScrollUpArrow>
  );
}

function SelectScrollDownArrow({
  className,
  ...props
}: BaseSelect.ScrollDownArrow.Props) {
  return (
    <BaseSelect.ScrollDownArrow
      className={cn(
        "bottom-0 z-1 flex h-7 w-full cursor-default items-center justify-center rounded-md bg-popover text-center text-xs before:absolute data-[side=none]:before:-bottom-full before:left-0 before:h-full before:w-full before:content-['']",
        className,
      )}
      data-slot="select-scroll-down-button"
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </BaseSelect.ScrollDownArrow>
  );
}

type SelectTriggerGroupProps = Omit<BaseSelect.Trigger.Props, "children"> & {
  size?: "default" | "sm" | "lg";
  indicatorIcon?: React.ReactNode;
  indicatorPlacement?: "start" | "end";
  placeholder?: string;
  children?: BaseSelect.Value.Props["children"];
};

function SelectTriggerGroup({
  className,
  children,
  size = "default",
  indicatorIcon,
  indicatorPlacement = "end",
  placeholder,
  ...props
}: SelectTriggerGroupProps) {
  return (
    <BaseSelect.Trigger
      className={cn(
        "group flex items-center gap-2 min-w-32 bg-transparent dark:bg-input/30 dark:hover:bg-input/50",
        "rounded-md border border-input text-sm shadow-xs transition-[color,box-shadow]",
        "focus-visible:outline focus-visible:outline-ring focus-visible:ring-4 focus-visible:ring-ring/10",
        "data-[invalid]:border-destructive data-[invalid]:ring-destructive/20 dark:data-[invalid]:ring-destructive/40",
        "[&>span[data-slot='select-value']]:flex-1 [&>span[data-slot='select-value']]:text-left [&>span[data-slot='select-value']]:truncate [&>span[data-slot='select-value']]:min-w-0",
        "dark:data-[popup-open]:bg-input/50",
        "data-[size=default]:h-9 data-[size=sm]:h-8 data-[size=lg]:h-10",
        "data-[size=default]:py-1.5 data-[size=sm]:py-1 data-[size=lg]:py-2",
        indicatorPlacement === "start" ? "pl-1" : "pl-3 pr-1",
        className,
      )}
      data-size={size}
      {...props}
    >
      <BaseSelect.Value
        className="flex flex-1 items-center gap-2 truncate line-clamp-1 data-[placeholder]:text-muted-foreground data-[placeholder]:before:content-[attr(data-placeholder-text)]"
        data-placeholder-text={placeholder}
        data-slot="select-value"
      >
        {children}
      </BaseSelect.Value>
      <BaseSelect.Icon
        className={cn(
          "flex-none shrink-0 pointer-events-none size-6 flex items-center justify-center",
          "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:transition-all",
          indicatorPlacement === "start" && "-order-1",
        )}
        data-slot="select-icon"
      >
        {indicatorIcon || <ChevronDownIcon />}
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  );
}

function SelectContent({
  className,
  children,
  side = "bottom",
  align = "start",
  sideOffset = 6,
  alignOffset = 0,
  alignItemWithTrigger = false,
  ...props
}: BaseSelect.Popup.Props &
  Pick<
    BaseSelect.Positioner.Props,
    "side" | "sideOffset" | "align" | "alignOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPortal>
      <BaseSelect.Positioner
        align={align}
        alignItemWithTrigger={alignItemWithTrigger}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <BaseSelect.Popup
          className={cn(
            "bg-popover text-popover-foreground rounded-md shadow-md overflow-hidden",
            "outline-1 outline-border dark:-outline-offset-1 animate-popup",
            "[&:not([data-side=none])]:max-h-[var(--available-height)] min-w-[var(--anchor-width)]",
            "data-[side=none]:data-[ending-style]:transition-none data-[side=none]:data-[starting-style]:transition-none data-[side=none]:data-[starting-style]:scale-100 data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:min-w-[calc(var(--anchor-width)+0.3rem)]",
            className,
          )}
          data-slot="select-content"
          {...props}
        >
          <SelectScrollUpArrow />
          <BaseSelect.List className="relative py-1 scroll-py-6 overflow-y-auto max-h-[min(23rem,var(--available-height))]">
            {children}
          </BaseSelect.List>
          <SelectScrollDownArrow />
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </SelectPortal>
  );
}

interface SelectItemContentProps extends BaseSelect.Item.Props {
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
      className={cn(
        "grid items-center gap-2 py-1.5 pl-3.5 text-sm",
        "outline-none select-none cursor-default",
        "highlight-on-active",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        indicatorPlacement === "start" && "grid-cols-[1rem_1fr] pr-8",
        indicatorPlacement === "end" && "grid-cols-[1fr_1rem] pr-3",
        className,
      )}
      data-slot="select-item"
      {...props}
    >
      <BaseSelect.ItemIndicator
        className={cn(
          "flex items-center justify-center row-start-1",
          "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
          indicatorPlacement === "start" ? "col-start-1" : "col-start-2",
        )}
        data-slot="select-item-indicator"
      >
        {indicatorIcon}
      </BaseSelect.ItemIndicator>
      <BaseSelect.ItemText
        className={cn(
          "flex items-center gap-2 row-start-1",
          indicatorPlacement === "start" ? "col-start-2" : "col-start-1",
        )}
      >
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
  SelectScrollUpArrow,
  SelectScrollDownArrow,
  SelectSeparator,
  // Composite components
  SelectTriggerGroup,
  SelectContent,
  SelectItemContent,
};
