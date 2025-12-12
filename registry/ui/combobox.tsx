"use client";

import * as React from "react";
import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { Check, ChevronDown, Search, X } from "lucide-react";

import { cn } from "@/lib/utils";

const Combobox = BaseCombobox.Root;

function ComboboxValue({
  ...props
}: React.ComponentProps<typeof BaseCombobox.Value> & { placeholder?: string }) {
  return (
    <BaseCombobox.Value
      data-slot="combobox-value"
      {...props}
    />
  );
}

function ComboboxTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Trigger>) {
  return (
    <BaseCombobox.Trigger
      data-slot="combobox-trigger"
      className={cn(
        "flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[border-color,box-shadow]",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[placeholder]:text-muted-foreground",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <BaseCombobox.Icon className="opacity-50 transition-transform duration-200 data-[popup-open]:rotate-180">
        <ChevronDown />
      </BaseCombobox.Icon>
    </BaseCombobox.Trigger>
  );
}


function ComboboxInput({
  className,
  multiple, 
  showSearchIcon,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Input> & {
  multiple?: boolean;
  showSearchIcon?: boolean;
}) {
  return (
    <div className={cn("relative flex w-full items-center", className)}>
      {showSearchIcon && (
        <Search className="absolute left-2.5 size-4 text-muted-foreground opacity-50" />
      )}
      <BaseCombobox.Input
        data-slot="combobox-input"
        className={cn(
          "flex w-full rounded-md border border-input bg-transparent py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          showSearchIcon ? "pl-9 pr-3" : "px-3",
          !multiple &&
            "h-9 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          multiple && "h-auto border-none shadow-none focus-visible:ring-0",
        )}
        {...props}
      />
    </div>
  );
}


function ComboboxChips({
  className,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Chips>) {
  return (
    <BaseCombobox.Chips
      data-slot="combobox-chips"
      className={cn(
        "flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[border-color,box-shadow]",
        "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] focus-within:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

function ComboboxChip({
  className,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Chip>) {
  return (
    <BaseCombobox.Chip
      data-slot="combobox-chip"
      className={cn(
        "inline-flex h-6 items-center gap-1 rounded-sm bg-secondary px-2 text-xs font-medium text-secondary-foreground transition-colors data-[highlighted]:bg-secondary/80",
        className
      )}
      {...props}
    />
  );
}

function ComboboxChipRemove({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseCombobox.ChipRemove>) {
  return (
    <BaseCombobox.ChipRemove
      data-slot="combobox-chip-remove"
      className={cn(
        "flex size-3.5 items-center justify-center rounded-xs opacity-50 ring-offset-background transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {children ?? <X className="size-3" />}
    </BaseCombobox.ChipRemove>
  );
}

function ComboboxPopup({
  className,
  children,
  align = "start",
  sideOffset = 4,
  matchAnchorWidth = true,
  classNames,
  ...props
}: Omit<React.ComponentProps<typeof BaseCombobox.Popup>, "className"> & {
  className?: string;
  align?: BaseCombobox.Positioner.Props["align"];
  sideOffset?: BaseCombobox.Positioner.Props["sideOffset"];
  matchAnchorWidth?: boolean;
  classNames?: {
    backdrop?: string;
    positioner?: string;
  };
}) {
  return (
    <BaseCombobox.Portal data-slot="combobox-portal">
      <BaseCombobox.Backdrop
        data-slot="combobox-backdrop"
        className={cn(classNames?.backdrop)}
      />
      <BaseCombobox.Positioner
        data-slot="combobox-positioner"
        align={align}
        sideOffset={sideOffset}
        className={cn("z-50 outline-none", classNames?.positioner)}
      >
        <BaseCombobox.Popup
          data-slot="combobox-content"
          className={cn(
            "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            "origin-[var(--transform-origin)] transition-[transform,scale,opacity] duration-100 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
            matchAnchorWidth && "w-[var(--anchor-width)]",
            className
          )}
          {...props}
        >
          {children}
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  );
}

function ComboboxList({
  className,
  ...props
}: React.ComponentProps<typeof BaseCombobox.List>) {
  return (
    <BaseCombobox.List
      data-slot="combobox-list"
      className={cn(
        "max-h-[min(var(--available-height),24rem)] overflow-y-auto overflow-x-hidden p-1",
        className
      )}
      {...props}
    />
  );
}

function ComboboxGroup({
  className,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Group>) {
  return (
    <BaseCombobox.Group
      data-slot="combobox-group"
      className={cn("overflow-hidden py-1 text-foreground", className)}
      {...props}
    />
  );
}

function ComboboxGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof BaseCombobox.GroupLabel>) {
  return (
    <BaseCombobox.GroupLabel
      data-slot="combobox-group-label"
      className={cn(
        "px-2 py-1.5 text-xs font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

function ComboboxItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Item>) {
  return (
    <BaseCombobox.Item
      data-slot="combobox-item"
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        <BaseCombobox.ItemIndicator>
          <Check className="size-4" />
        </BaseCombobox.ItemIndicator>
      </span>
      {children}
    </BaseCombobox.Item>
  );
}

function ComboboxEmpty({
  className,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Empty>) {
  return (
    <BaseCombobox.Empty
      data-slot="combobox-empty"
      className={cn("px-2 py-1 text-sm empty:m-0 empty:p-0", className)}
      {...props}
    />
  );
}

function ComboboxSeparator({
  className,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Separator>) {
  return (
    <BaseCombobox.Separator
      data-slot="combobox-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

function ComboboxClear({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Clear>) {
  return (
    <BaseCombobox.Clear
      data-slot="combobox-clear"
      className={cn(
        "absolute right-2 top-1/2 -translate-y-1/2 rounded-sm opacity-50 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[disabled]:pointer-events-none",
        className
      )}
      {...props}
    >
      {children ?? <X className="size-4" />}
    </BaseCombobox.Clear>
  );
}

export {
  Combobox,
  ComboboxValue,
  ComboboxTrigger,
  ComboboxInput,
  ComboboxPopup,
  ComboboxList,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxItem,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxClear,
};