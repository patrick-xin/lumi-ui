"use client";

import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import type { VariantProps } from "class-variance-authority";
import { Check, ChevronDown, X } from "lucide-react";
import type * as React from "react";
import { cn } from "@/registry/lib/utils";
import { Button } from "@/registry/ui/button";
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
  className,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Icon>) {
  return (
    <BaseCombobox.Icon
      className={cn(
        "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
        className,
      )}
      data-slot="combobox-icon"
      {...props}
    />
  );
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
      className={cn(inputVariants({ inputSize, variant }), className)}
      data-slot="combobox-input"
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
      aria-label="Clear selection"
      className={cn("outline-none", className)}
      data-slot="combobox-clear"
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
      className={cn(
        "pointer-coarse:after:absolute pointer-coarse:after:min-h-10 pointer-coarse:after:min-w-10",
        className,
      )}
      data-slot="combobox-trigger"
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
      className={cn(
        "dark:bg-input/30 border border-input",
        "p-1 min-h-8 [&_[data-slot=combobox-input]]:h-6",
        "flex flex-wrap items-center gap-1.5 rounded-md shadow-xs",
        "focus-within:outline focus-within:outline-ring focus-within:ring-4 focus-within:ring-ring/10",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      data-slot="combobox-chips"
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
      className={cn(
        "flex items-center gap-1 px-2 py-1 rounded-md shadow-xs text-sm bg-secondary text-secondary-foreground outline-none cursor-default",
        "focus-within:bg-secondary/80 focus-within:text-secondary-foreground/80",
        "[@media(hover:hover)]:[&[data-highlighted]]:bg-secondary/80 [@media(hover:hover)]:[&[data-highlighted]]:text-secondary-foreground/80",
        className,
      )}
      data-slot="combobox-chip"
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
      aria-label="Remove"
      className={cn(
        "p-1 inline-flex items-center justify-center bg-transparent hover:bg-accent text-inherit rounded-md transition-colors",
        "[&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
        className,
      )}
      data-slot="combobox-chip-remove"
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
      className={cn(
        "outline-0 py-1 data-[empty]:p-0",
        "overflow-y-auto scroll-py-2 overscroll-contain",
        className,
      )}
      data-slot="combobox-list"
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
      className={cn("outline-none", className)}
      data-slot="combobox-positioner"
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
      className={cn(
        "p-3 text-xs text-center text-muted-foreground flex gap-2 items-center empty:m-0 empty:p-0",
        className,
      )}
      data-slot="combobox-status"
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
      className={cn(
        "p-3 text-xs text-center text-muted-foreground empty:m-0 empty:p-0",
        className,
      )}
      data-slot="combobox-empty"
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
      className={cn(
        "flex items-center gap-2 py-1.5 pl-3.5 pr-8 text-sm",
        "select-none cursor-default outline-none",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      data-slot="combobox-item"
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
      className={cn("mb-1 last:mb-0", className)}
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
      className={cn(
        "px-3.5 py-1.5 text-xs text-muted-foreground font-medium",
        className,
      )}
      data-slot="combobox-group-label"
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
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      data-slot="combobox-separator"
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
  addonIcon,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Input> & {
  showTrigger?: boolean;
  showClear?: boolean;
  variant?: VariantProps<typeof inputVariants>["variant"];
  inputSize?: VariantProps<typeof inputVariants>["inputSize"];
  addonIcon?: React.ReactNode;
}) {
  const paddingClass =
    showTrigger && showClear
      ? "pr-14"
      : showTrigger || showClear
        ? "pr-8"
        : "pr-3";

  return (
    <div
      className={cn(
        "relative w-full inline-flex gap-1 items-center outline-none cursor-text",
        className,
      )}
      data-slot="combobox-input-group"
    >
      {addonIcon && (
        <BaseCombobox.Icon
          className="[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground absolute left-1 size-6 flex justify-center items-center"
          data-slot="autocomplete-addon-icon"
        >
          {addonIcon}
        </BaseCombobox.Icon>
      )}
      <BaseCombobox.Input
        className={cn(
          inputVariants({ inputSize, variant }),
          addonIcon && "pl-7",
          paddingClass,
        )}
        data-slot="combobox-input"
        {...props}
      />
      <div className="absolute right-1 top-0 h-full inline-flex items-center">
        {showClear && (
          <BaseCombobox.Clear
            aria-label="Clear selection"
            data-slot="combobox-clear"
            render={
              <Button
                className="[&_svg]:text-muted-foreground hover:[&_svg]:text-foreground"
                size={"icon-xs"}
                variant="ghost"
              />
            }
          >
            <X />
          </BaseCombobox.Clear>
        )}
        {showTrigger && (
          <BaseCombobox.Trigger
            data-slot="combobox-trigger"
            render={
              <Button
                className="[&_svg]:text-muted-foreground data-popup-open:[&_svg]:text-foreground hover:[&_svg]:text-foreground"
                size={"icon-xs"}
                variant="ghost"
              />
            }
          >
            <BaseCombobox.Icon data-slot="combobox-icon">
              <ChevronDown className="size-4" />
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
  side = "bottom",
  sideOffset = 6,
  align = "start",
  matchAnchorWidth = true,
  alignOffset = 0,
  positionerAnchor,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Popup> & {
  side?: BaseCombobox.Positioner.Props["side"];
  sideOffset?: BaseCombobox.Positioner.Props["sideOffset"];
  align?: BaseCombobox.Positioner.Props["align"];
  alignOffset?: BaseCombobox.Positioner.Props["alignOffset"];
  matchAnchorWidth?: boolean;
  positionerAnchor?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <BaseCombobox.Portal data-slot="combobox-portal">
      <BaseCombobox.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={positionerAnchor}
        data-slot="combobox-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <BaseCombobox.Popup
          className={cn(
            "bg-popover text-popover-foreground rounded-md shadow-md",
            "outline-1 outline-border dark:-outline-offset-1",
            "overflow-hidden overflow-y-auto",
            "max-w-[var(--available-width)] max-h-[min(23rem,var(--available-height))]",
            "animate-popup",
            matchAnchorWidth && "w-[var(--anchor-width)]",
            className,
          )}
          data-slot="combobox-content"
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
  indicatorPlacement?: "start" | "end" | "none";
  indicatorIcon?: React.ReactNode;
}

function ComboboxItemContent({
  className,
  children,
  indicatorPlacement = "start",
  indicatorIcon = <Check />,
  ...props
}: ComboboxItemContentProps) {
  return (
    <BaseCombobox.Item
      className={cn(
        "grid items-center gap-2 py-1.5 pl-3.5 text-sm text-foreground",
        "outline-none select-none cursor-default",
        "highlight-on-active",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        indicatorPlacement === "start" && "grid-cols-[1rem_1fr] pr-8",
        indicatorPlacement === "end" && "grid-cols-[1fr_1rem] pr-3",
        indicatorPlacement === "none" && "grid-cols-1",
        className,
      )}
      data-slot="combobox-item-content"
      {...props}
    >
      {indicatorPlacement !== "none" && (
        <BaseCombobox.ItemIndicator
          className={cn(
            "flex items-center justify-center row-start-1",
            "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
            indicatorPlacement === "start" ? "col-start-1" : "col-start-2",
          )}
          data-slot="combobox-item-indicator"
        >
          {indicatorIcon}
        </BaseCombobox.ItemIndicator>
      )}
      <div
        className={cn(
          "flex items-center gap-2 row-start-1",
          indicatorPlacement === "start" ? "col-start-2" : "col-start-1",
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
  // Composite components
  ComboboxInputGroup,
  ComboboxContent,
  ComboboxItemContent,
};
