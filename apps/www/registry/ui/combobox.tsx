"use client";

import * as React from "react";
import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { Check, ChevronDown, X } from "lucide-react";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { inputVariants } from "@/registry/ui/input";

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
  inputSize = "default",
  variant = "default",
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
      className={cn("outline-none", className)}
      aria-label="Clear selection"
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
      aria-label="Open popup"
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
        "dark:bg-input/30 border border-input",
        "p-1 min-h-8 [&_[data-slot=combobox-input]]:h-6",
        "flex flex-wrap items-center gap-1.5 rounded-md shadow-xs",
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
        "flex items-center gap-1 px-2 py-1 rounded-sm shadow-xs text-sm bg-secondary text-secondary-foreground outline-none cursor-default",
        "focus-within:bg-secondary/80 focus-within:text-secondary-foreground/80",
        "[@media(hover:hover)]:[&[data-highlighted]]:bg-secondary/80 [@media(hover:hover)]:[&[data-highlighted]]:text-secondary-foreground/80",
        className,
      )}
      {...props}
    >
      {children}
      <ComboboxChipRemove />
    </BaseCombobox.Chip>
  );
}

function ComboboxChipRemove({
  className,
  icon = <X />,
  ...props
}: React.ComponentProps<typeof BaseCombobox.ChipRemove> & {
  icon?: React.ReactNode;
}) {
  return (
    <BaseCombobox.ChipRemove
      data-slot="combobox-chip-remove"
      className={cn(
        "p-1 inline-flex items-center justify-center bg-transparent hover:bg-accent text-inherit rounded-sm transition-colors",
        "[&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
        className,
      )}
      aria-label="Remove"
      {...props}
    >
      {icon}
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
        "outline-0 py-1.5 data-[empty]:p-0",
        "overflow-y-auto scroll-py-2 overscroll-contain",
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
  className,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Positioner>) {
  return (
    <BaseCombobox.Positioner
      data-slot="combobox-positioner"
      className={cn("outline-none", className)}
      {...props}
    />
  );
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
        "flex gap-2 py-1.5 pl-3.5 pr-8 text-sm",
        "select-none cursor-default outline-none",
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
        "px-3 py-1 text-xs text-muted-foreground font-medium uppercase",
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
  showTrigger = false,
  showClear = false,
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
      className={cn("relative w-full", className)}
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
            aria-label="Clear selection"
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
              "outline-none p-1 rounded-md bg-transparent hover:bg-accent dark:hover:bg-accent/60 transition-colors",
              "pointer-coarse:after:absolute pointer-coarse:after:min-h-10 pointer-coarse:after:min-w-10",
            )}
          >
            <BaseCombobox.Icon
              data-slot="combobox-icon"
              className="[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground"
            >
              <ChevronDown />
            </BaseCombobox.Icon>
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
  positionerAnchor,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Popup> & {
  sideOffset?: BaseCombobox.Positioner.Props["sideOffset"];
  align?: BaseCombobox.Positioner.Props["align"];
  matchAnchorWidth?: boolean;
  positionerAnchor?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <BaseCombobox.Portal data-slot="combobox-portal">
      <BaseCombobox.Positioner
        data-slot="combobox-positioner"
        sideOffset={sideOffset}
        align={align}
        anchor={positionerAnchor}
      >
        <BaseCombobox.Popup
          data-slot="combobox-content"
          className={cn(
            "bg-popover text-popover-foreground rounded shadow-md",
            "outline outline-1 outline-border dark:-outline-offset-1",
            "overflow-hidden overflow-y-auto",
            "max-w-[var(--available-width)] max-h-[min(23rem,var(--available-height))]",
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

interface ComboboxItemContentProps
  extends React.ComponentProps<typeof BaseCombobox.Item> {
  iconPosition?: "start" | "end" | "none";
  icon?: React.ReactNode;
}

function ComboboxItemContent({
  className,
  children,
  iconPosition = "start",
  icon = <Check />,
  ...props
}: ComboboxItemContentProps) {
  return (
    <BaseCombobox.Item
      data-slot="combobox-item-content"
      className={cn(
        "grid items-center gap-2 py-1.5 pl-3.5 text-sm",
        "outline-none select-none cursor-default",
        "data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:before:bg-accent data-[highlighted]:text-accent-foreground data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1.5 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        iconPosition === "start" && "grid-cols-[1rem_1fr] pr-8",
        iconPosition === "end" && "grid-cols-[1fr_1rem] pr-3",
        iconPosition === "none" && "grid-cols-1",
        className,
      )}
      {...props}
    >
      {iconPosition !== "none" && (
        <BaseCombobox.ItemIndicator
          data-slot="combobox-item-indicator"
          className={cn(
            "flex items-center justify-center row-start-1",
            "[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
            iconPosition === "start" ? "col-start-1" : "col-start-2",
          )}
        >
          {icon}
        </BaseCombobox.ItemIndicator>
      )}
      <div
        className={cn(
          "flex items-center gap-2 row-start-1",
          iconPosition === "start" ? "col-start-2" : "col-start-1",
        )}
      >
        {children}
      </div>
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
