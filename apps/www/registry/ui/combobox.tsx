"use client";

import * as React from "react";
import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { Check, ChevronDown, X } from "lucide-react";
import { inputVariants } from "@/registry/ui/input";

import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

function Combobox<Value, Multiple extends boolean | undefined = false>({
  children,
  ...props
}: BaseCombobox.Root.Props<Value, Multiple>) {
  return (
    <BaseCombobox.Root data-slot="combobox" {...props}>
      {children}
    </BaseCombobox.Root>
  );
}

function ComboboxValue({
  ...props
}: React.ComponentProps<typeof BaseCombobox.Value>) {
  return <BaseCombobox.Value data-slot="combobox-value" {...props} />;
}

function ComboboxIcon({
  ...props
}: React.ComponentProps<typeof BaseCombobox.Icon>) {
  return <BaseCombobox.Icon data-slot="combobox-icon" {...props} />;
}

function ComboboxInput({
  className,
  inputSize,
  variant,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Input> & {
  inputSize?: VariantProps<typeof inputVariants>["inputSize"];
  variant?: VariantProps<typeof inputVariants>["variant"];
}) {
  return (
    <BaseCombobox.Input
      data-slot="combobox-input"
      className={cn(inputVariants({ inputSize, variant }), className)}
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
      data-slot="combobox-clear"
      className={cn(className)}
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
        "pointer-coarse:after:absolute pointer-coarse:after:min-h-10 pointer-coarse:after:min-w-10",
        className,
      )}
      {...props}
    />
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
        "focus-within:border-ring/30 focus-within:ring-1 focus-within:ring-ring/10 focus-within:ring-offset-1 focus-within:ring-offset-ring/5",
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
        "inline-flex h-6 items-center gap-1.5 rounded-sm bg-secondary px-2 text-sm text-foreground transition-colors data-[highlighted]:bg-secondary/80",
        className,
      )}
      {...props}
    >
      {children}
      <ComboboxChipRemove aria-label="Remove" />
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
        "flex size-5 p-0.5 items-center justify-center hover:bg-primary/10 rounded-md transition-colors",
        "focus-visible:border-ring/30 focus-visible:ring-1 focus-visible:ring-ring/10 focus-visible:ring-offset-1 focus-visible:ring-offset-ring/5",
        "[&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children ?? <X className="size-3.5" />}
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
      className={cn("p-1 data-[empty]:p-0", className)}
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
  return <BaseCombobox.Popup data-slot="combobox-popup" {...props} />;
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
  return (
    <BaseCombobox.Status
      data-slot="combobox-status"
      className={cn(
        "p-3 text-xs text-center text-muted-foreground flex gap-2 items-center empty:m-0 empty:p-0",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxEmpty({
  className,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Empty>) {
  return (
    <BaseCombobox.Empty
      data-slot="combobox-empty"
      className={cn(
        "p-3 text-xs text-center text-muted-foreground empty:m-0 empty:p-0",
        className,
      )}
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
  ...props
}: React.ComponentProps<typeof BaseCombobox.Item>) {
  return (
    <BaseCombobox.Item
      data-slot="combobox-item"
      className={cn(
        "relative flex w-full cursor-default gap-2 rounded-sm py-1.5 px-2 text-sm select-none outline-hidden transition-colors",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    />
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

function ComboboxGroup({
  className,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Group>) {
  return (
    <BaseCombobox.Group
      data-slot="combobox-group"
      className={cn("mb-1 last:mb-0", className)}
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
        "px-2 py-1 text-xs text-muted-foreground font-medium",
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

function ComboboxInputGroup({
  className,
  showTrigger = true,
  showClear = true,
  variant = "default",
  inputSize = "default",
  ...props
}: React.ComponentProps<typeof BaseCombobox.Input> & {
  showTrigger?: boolean;
  showClear?: boolean;
  variant?: VariantProps<typeof inputVariants>["variant"];
  inputSize?: VariantProps<typeof inputVariants>["inputSize"];
}) {
  const paddingClass =
    showTrigger && showClear
      ? "pr-14"
      : showTrigger || showClear
        ? "pr-8"
        : "pr-3";

  return (
    <div
      data-slot="combobox-input-group"
      className={cn("relative w-full min-w-12", className)}
    >
      <BaseCombobox.Input
        data-slot="combobox-input"
        className={cn(inputVariants({ variant, inputSize }), paddingClass)}
        {...props}
      />
      <div className="absolute right-1 top-0 h-full flex items-center pr-1">
        {showClear && (
          <BaseCombobox.Clear
            data-slot="combobox-clear"
            className={cn(
              "outline-none p-1 rounded-md bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/60 transition-all",
              "pointer-coarse:after:absolute pointer-coarse:after:min-h-10 pointer-coarse:after:min-w-10",
              "[&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
            )}
          >
            <X />
          </BaseCombobox.Clear>
        )}
        {showTrigger && (
          <BaseCombobox.Trigger
            data-slot="combobox-trigger"
            className={cn(
              "outline-none p-1 rounded-md bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/60 transition-all pointer-coarse:after:absolute pointer-coarse:after:min-h-10 pointer-coarse:after:min-w-10 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
            )}
          >
            <ChevronDown />
          </BaseCombobox.Trigger>
        )}
      </div>
    </div>
  );
}

function ComboboxContent({
  className,
  children,
  sideOffset = 6,
  align = "start",
  matchAnchorWidth = true,
  positionerRef,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Popup> & {
  sideOffset?: BaseCombobox.Positioner.Props["sideOffset"];
  align?: BaseCombobox.Positioner.Props["align"];
  matchAnchorWidth?: boolean;
  positionerRef?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner
        sideOffset={sideOffset}
        align={align}
        anchor={positionerRef}
      >
        <BaseCombobox.Popup
          data-slot="combobox-content" 
          className={cn(
            "group bg-popover text-popover-foreground relative bg-clip-padding overflow-hidden rounded-md max-w-[var(--available-width)] max-h-[min(23rem,var(--available-height))] overflow-y-auto",
            "shadow-md shadow-primary/10 outline dark:-outline-offset-1 outline-primary/10",
            "animate-popup",
            matchAnchorWidth && "w-[var(--anchor-width)]",
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

function ComboboxItemContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Item>) {
  return (
    <BaseCombobox.Item
      data-slot="combobox-item-content"
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 px-2 text-sm select-none outline-hidden transition-colors",
        "*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-4 items-center justify-center">
        <BaseCombobox.ItemIndicator>
          <Check className="size-4 text-muted-foreground" />
        </BaseCombobox.ItemIndicator>
      </span>
      {children}
    </BaseCombobox.Item>
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
  ComboboxItemContent,
};
