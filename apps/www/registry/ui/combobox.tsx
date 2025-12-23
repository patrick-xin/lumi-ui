"use client";

import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import type { VariantProps } from "class-variance-authority";
import { Check, ChevronDown, X } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";
import { inputVariants } from "@/registry/ui/input";

function Combobox<Value, Multiple extends boolean | undefined = false>({
  children,
  ...props
}: BaseCombobox.Root.Props<Value, Multiple>) {
  return <BaseCombobox.Root {...props}>{children}</BaseCombobox.Root>;
}

function ComboboxValue({
  ...props
}: React.ComponentProps<typeof BaseCombobox.Value> & { placeholder?: string }) {
  return <BaseCombobox.Value data-slot="combobox-value" {...props} />;
}

function ComboboxIcon({
  ...props
}: React.ComponentProps<typeof BaseCombobox.Icon>) {
  return <BaseCombobox.Icon data-slot="combobox-icon" {...props} />;
}

function ComboboxInput({
  className,
  variant,
  multiple,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Input> & {
  variant?: VariantProps<typeof inputVariants>["variant"];
}) {
  return (
    <BaseCombobox.Input
      data-slot="combobox-input"
      className={cn(
        inputVariants({ variant }),
        multiple &&
          "border-none focus-visible:ring-0 shadow-none bg-transparent!",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxClear({
  className,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Clear>) {
  return (
    <BaseCombobox.Clear
      className={cn(
        "outline-none transition-all pointer-coarse:after:absolute pointer-coarse:after:min-h-10 pointer-coarse:after:min-w-10",
        "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxTrigger({
  className,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Trigger>) {
  return (
    <BaseCombobox.Trigger
      data-slot="combobox-trigger"
      className={cn(
        "outline-none pointer-coarse:after:absolute pointer-coarse:after:min-h-10 pointer-coarse:after:min-w-10 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxInputGroup({
  className,
  showTrigger = true,
  showClear = true,
  variant,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Input> & {
  showTrigger?: boolean;
  showClear?: boolean;
  variant?: VariantProps<typeof inputVariants>["variant"];
}) {
  return (
    <div
      className={cn(
        "relative w-full min-w-12 [&_input]:pr-10 has-[data-slot=clear]:[&_input]:pr-8 has-[data-slot=trigger]:[&_input]:pr-8 has-[data-slot=clear]:has-[data-slot=trigger]:[&_input]:pr-14",
        className,
      )}
      data-slot="combobox-input-group"
    >
      <BaseCombobox.Input
        className={cn(inputVariants({ variant }))}
        {...props}
      />
      <div className="absolute right-1 top-0 h-full flex items-center pr-1.5 gap-1.5">
        {showClear && (
          <ComboboxClear className="text-muted-foreground hover:text-foreground">
            <X />
          </ComboboxClear>
        )}
        {showTrigger && (
          <ComboboxTrigger className="text-muted-foreground/50 hover:text-foreground">
            <ChevronDown />
          </ComboboxTrigger>
        )}
      </div>
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
        "flex flex-wrap min-h-10 w-full items-center gap-1.5 rounded-md border border-input bg-transparent text-sm shadow-xs transition-[border-color,box-shadow] dark:bg-input/30",
        "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-2 focus-within:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxChip({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Chip>) {
  return (
    <BaseCombobox.Chip
      data-slot="combobox-chip"
      className={cn(
        "m-0.5 inline-flex h-6 items-center gap-1 rounded-sm bg-secondary px-2 text-sm font-normal text-secondary-foreground transition-colors data-[highlighted]:bg-secondary/80",
        className,
      )}
      {...props}
    >
      {children}
      <ComboboxChipRemove aria-label="Remove"></ComboboxChipRemove>
    </BaseCombobox.Chip>
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
        "flex size-4 items-center justify-center rounded-md opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    >
      {children ?? <X className="size-4" />}
    </BaseCombobox.ChipRemove>
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
        "max-h-[min(var(--available-height),24rem)] overflow-y-auto overflow-x-hidden p-1 empty:p-0",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxPortal({
  ...props
}: React.ComponentProps<typeof BaseCombobox.Portal>) {
  return <BaseCombobox.Portal data-slot="combobox-portal" {...props} />;
}

function ComboboxBackdrop({
  ...props
}: React.ComponentProps<typeof BaseCombobox.Backdrop>) {
  return <BaseCombobox.Backdrop data-slot="combobox-backdrop" {...props} />;
}

function ComboboxPositioner({
  ...props
}: React.ComponentProps<typeof BaseCombobox.Positioner>) {
  return <BaseCombobox.Positioner data-slot="combobox-positioner" {...props} />;
}

function ComboboxPopup({
  ...props
}: React.ComponentProps<typeof BaseCombobox.Popup>) {
  return (
    <BaseCombobox.Popup
      className={cn(
        "bg-popover w-[var(--anchor-width)] max-w-[var(--available-width)]",
        "transition-[transform,scale,opacity] origin-[var(--transform-origin)] duration-100",
        "outline outline-border dark:-outline-offset-1",
        "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
        "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
      )}
      data-slot="combobox-popup"
      {...props}
    />
  );
}

function ComboboxArrow({
  ...props
}: React.ComponentProps<typeof BaseCombobox.Arrow>) {
  return <BaseCombobox.Arrow data-slot="combobox-arrow" {...props} />;
}

function ComboboxStatus({
  className,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Status>) {
  return <BaseCombobox.Status data-slot="combobox-status" className={cn(
    "flex items-center gap-2 px-3 py-2 text-sm empty:hidden", className
  )} {...props} />;
}

function ComboboxEmpty({
  className,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Empty>) {
  return (
    <BaseCombobox.Empty
      data-slot="combobox-empty"
      className={cn("px-3 py-2 text-sm empty:hidden", className)}
      {...props}
    />
  );
}

function ComboboxCollection({
  ...props
}: React.ComponentProps<typeof BaseCombobox.Collection>) {
  return <BaseCombobox.Collection data-slot="combobox-collection" {...props} />;
}

function ComboboxRow({
  ...props
}: React.ComponentProps<typeof BaseCombobox.Row>) {
  return <BaseCombobox.Row data-slot="combobox-row" {...props} />;
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
        "relative flex gap-2 w-full cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none transition-colors",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        "*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <BaseCombobox.ItemIndicator>
          <Check className="size-4" />
        </BaseCombobox.ItemIndicator>
      </span>
      {children}
    </BaseCombobox.Item>
  );
}

function ComboboxItemIndicator({
  ...props
}: React.ComponentProps<typeof BaseCombobox.ItemIndicator>) {
  return (
    <BaseCombobox.ItemIndicator
      data-slot="combobox-item-indicator"
      {...props}
    />
  );
}

function ComboboxContent({
  className,
  children,
  sideOffset = 6,
  align = "start",
  ...props
}: React.ComponentProps<typeof BaseCombobox.Popup> & {
  sideOffset?: number;
  align?: "start" | "center" | "end";
}) {
  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner
        sideOffset={sideOffset}
        align={align}
        className="z-50"
      >
        <BaseCombobox.Popup
          className={cn(
            "bg-popover text-popover-foreground relative flex flex-col rounded-md shadow-md",
            "outline outline-border dark:-outline-offset-1",
            "w-[var(--anchor-width)] max-w-[var(--available-width)]",
            "max-h-[min(var(--available-height),24rem)]",
            "animate-popup",
            className,
          )}
          {...props}
        >
          {children}
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  );
}

function ComboboxGroup({
  ...props
}: React.ComponentProps<typeof BaseCombobox.Group>) {
  return (
    <BaseCombobox.Group
      data-slot="combobox-group"
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
        "px-2 py-1.5 text-sm font-medium text-muted-foreground/70",
        className,
      )}
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

const useComboboxFilter = BaseCombobox.useFilter;

export {
  Combobox,
  ComboboxValue,
  ComboboxIcon,
  ComboboxInput,
  ComboboxClear,
  ComboboxTrigger,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxList,
  ComboboxPortal,
  ComboboxBackdrop,
  ComboboxPositioner,
  ComboboxPopup,
  ComboboxArrow,
  ComboboxEmpty,
  ComboboxGroupLabel,
  ComboboxItem,
  ComboboxSeparator,
  ComboboxGroup,
  ComboboxItemIndicator,
  ComboboxRow,
  ComboboxStatus,
  ComboboxCollection,
  useComboboxFilter,
  // Pre-assembled components
  ComboboxInputGroup,
  ComboboxContent,
};
