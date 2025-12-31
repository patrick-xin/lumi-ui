"use client";

import * as React from "react";
import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type { VariantProps } from "class-variance-authority";
import { ChevronDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { inputVariants } from "@/registry/ui/input";

const Autocomplete = BaseAutocomplete.Root;

function AutocompleteValue({
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Value>) {
  return <BaseAutocomplete.Value data-slot="autocomplete-value" {...props} />;
}

function AutocompleteIcon({
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Icon>) {
  return (
    <BaseAutocomplete.Icon
      data-slot="autocomplete-icon"
      className="[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground"
      {...props}
    />
  );
}

function AutocompleteInput({
  className,
  variant = "default",
  inputSize = "default",
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Input> & {
  variant?: VariantProps<typeof inputVariants>["variant"];
  inputSize?: VariantProps<typeof inputVariants>["inputSize"];
}) {
  return (
    <BaseAutocomplete.Input
      data-slot="autocomplete-input"
      className={cn(inputVariants({ variant, inputSize }), className)}
      {...props}
    />
  );
}

function AutocompleteClear({
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Clear>) {
  return (
    <BaseAutocomplete.Clear
      data-slot="autocomplete-clear"
      className={cn("outline-none", className)}
      aria-label="Clear selection"
      {...props}
    />
  );
}

function AutocompleteTrigger({
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Trigger>) {
  return (
    <BaseAutocomplete.Trigger
      data-slot="autocomplete-trigger"
      className={cn(
        "pointer-coarse:after:absolute pointer-coarse:after:min-h-10 pointer-coarse:after:min-w-10",
        className,
      )}
      aria-label="Open popup"
      {...props}
    />
  );
}

function AutocompleteList({
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.List>) {
  return (
    <BaseAutocomplete.List
      data-slot="autocomplete-list"
      className={cn(
        "outline-0 py-1 data-[empty]:p-0",
        "overflow-y-auto scroll-py-2 overscroll-contain",
        className,
      )}
      {...props}
    />
  );
}

function AutocompletePortal({
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Portal>) {
  return <BaseAutocomplete.Portal data-slot="autocomplete-portal" {...props} />;
}

function AutocompleteBackdrop({
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Backdrop>) {
  return (
    <BaseAutocomplete.Backdrop data-slot="autocomplete-backdrop" {...props} />
  );
}

function AutocompletePositioner({
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Positioner>) {
  return (
    <BaseAutocomplete.Positioner
      data-slot="autocomplete-positioner"
      className={cn("outline-none", className)}
      {...props}
    />
  );
}

function AutocompletePopup({
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Popup>) {
  return <BaseAutocomplete.Popup data-slot="autocomplete-popup" {...props} />;
}

function AutocompleteArrow({
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Arrow>) {
  return <BaseAutocomplete.Arrow data-slot="autocomplete-arrow" {...props} />;
}

function AutocompleteStatus({
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Status>) {
  return (
    <BaseAutocomplete.Status
      data-slot="autocomplete-status"
      className={cn(
        "p-3 text-xs text-center text-muted-foreground flex gap-2 items-center empty:m-0 empty:p-0",
        className,
      )}
      {...props}
    />
  );
}

function AutocompleteEmpty({
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Empty>) {
  return (
    <BaseAutocomplete.Empty
      data-slot="autocomplete-empty"
      className={cn(
        "p-3 text-xs text-center text-muted-foreground empty:m-0 empty:p-0",
        className,
      )}
      {...props}
    />
  );
}

function AutocompleteCollection({
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Collection>) {
  return (
    <BaseAutocomplete.Collection
      data-slot="autocomplete-collection"
      {...props}
    />
  );
}

function AutocompleteRow({
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Row>) {
  return <BaseAutocomplete.Row data-slot="autocomplete-row" {...props} />;
}

function AutocompleteItem({
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Item>) {
  return (
    <BaseAutocomplete.Item
      data-slot="autocomplete-item"
      className={cn(
        "flex gap-2 py-1.5 pl-3.5 pr-8 text-sm",
        "select-none cursor-default outline-none",
        "data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:before:bg-accent data-[highlighted]:text-accent-foreground data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm",
        "[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

function AutocompleteGroup({
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Group>) {
  return (
    <BaseAutocomplete.Group
      data-slot="autocomplete-group"
      className={cn("mb-1 last:mb-0", className)}
      {...props}
    />
  );
}

function AutocompleteGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.GroupLabel>) {
  return (
    <BaseAutocomplete.GroupLabel
      data-slot="autocomplete-group-label"
      className={cn(
        "px-3 py-1 text-xs text-muted-foreground font-medium uppercase",
        className,
      )}
      {...props}
    />
  );
}

function AutocompleteSeparator({
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Separator>) {
  return (
    <BaseAutocomplete.Separator
      data-slot="autocomplete-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

function AutocompleteInputGroup({
  className,
  showTrigger = false,
  showClear = false,
  variant = "default",
  inputSize = "default",
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Input> & {
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
      data-slot="autocomplete-input-group"
      className={cn("relative w-full", className)}
    >
      <BaseAutocomplete.Input
        data-slot="autocomplete-input"
        className={cn(inputVariants({ variant, inputSize }), paddingClass)}
        {...props}
      />
      <div className="absolute right-1 top-0 h-full flex items-center pr-1">
        {showClear && (
          <BaseAutocomplete.Clear
            data-slot="autocomplete-clear"
            aria-label="Clear selection"
            className={cn(
              "outline-none p-1 rounded-md bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/60 transition-all",
              "pointer-coarse:after:absolute pointer-coarse:after:min-h-10 pointer-coarse:after:min-w-10",
              "[&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
            )}
          >
            <X />
          </BaseAutocomplete.Clear>
        )}
        {showTrigger && (
          <BaseAutocomplete.Trigger
            data-slot="autocomplete-trigger"
            className={cn(
              "outline-none p-1 rounded-md bg-transparent hover:bg-accent dark:hover:bg-accent/60 transition-colors",
              "pointer-coarse:after:absolute pointer-coarse:after:min-h-10 pointer-coarse:after:min-w-10",
            )}
          >
            <BaseAutocomplete.Icon
              data-slot="autocomplete-icon"
              className="[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground"
            >
              <ChevronDown />
            </BaseAutocomplete.Icon>
          </BaseAutocomplete.Trigger>
        )}
      </div>
    </div>
  );
}

function AutocompleteContent({
  className,
  children,
  sideOffset = 6,
  align = "start",
  matchAnchorWidth = true,
  positionerAnchor,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Popup> & {
  sideOffset?: BaseAutocomplete.Positioner.Props["sideOffset"];
  align?: BaseAutocomplete.Positioner.Props["align"];
  matchAnchorWidth?: boolean;
  positionerAnchor?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <BaseAutocomplete.Portal data-slot="autocomplete-portal">
      <BaseAutocomplete.Positioner
        data-slot="autocomplete-positioner"
        sideOffset={sideOffset}
        align={align}
        anchor={positionerAnchor}
      >
        <BaseAutocomplete.Popup
          data-slot="autocomplete-content"
          className={cn(
            "bg-popover text-popover-foreground rounded-sm shadow-md",
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
        </BaseAutocomplete.Popup>
      </BaseAutocomplete.Positioner>
    </BaseAutocomplete.Portal>
  );
}

const useAutocompleteFilter = BaseAutocomplete.useFilter;

export {
  Autocomplete,
  AutocompleteValue,
  AutocompleteIcon,
  AutocompleteInput,
  AutocompleteClear,
  AutocompleteTrigger,
  AutocompleteList,
  AutocompletePortal,
  AutocompleteBackdrop,
  AutocompletePositioner,
  AutocompletePopup,
  AutocompleteArrow,
  AutocompleteEmpty,
  AutocompleteGroupLabel,
  AutocompleteItem,
  AutocompleteSeparator,
  AutocompleteGroup,
  AutocompleteRow,
  AutocompleteStatus,
  AutocompleteCollection,
  useAutocompleteFilter,
  // Composite components
  AutocompleteInputGroup,
  AutocompleteContent,
};
