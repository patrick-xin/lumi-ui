"use client";

import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type { VariantProps } from "class-variance-authority";
import { ChevronDown, X } from "lucide-react";
import type * as React from "react";
import { cn } from "@/registry/lib/utils";
import { Button } from "@/registry/ui/button";
import { inputVariants } from "@/registry/ui/input";

const Autocomplete = BaseAutocomplete.Root;

function AutocompleteValue({
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Value>) {
  return <BaseAutocomplete.Value data-slot="autocomplete-value" {...props} />;
}

function AutocompleteIcon({
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Icon>) {
  return (
    <BaseAutocomplete.Icon
      className={cn(
        "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
        className,
      )}
      data-slot="autocomplete-icon"
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
      className={cn(inputVariants({ inputSize, variant }), className)}
      data-slot="autocomplete-input"
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
      aria-label="Clear selection"
      className={cn("outline-none", className)}
      data-slot="autocomplete-clear"
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
      className={cn(
        "pointer-coarse:after:absolute pointer-coarse:after:min-h-10 pointer-coarse:after:min-w-10",
        className,
      )}
      data-slot="autocomplete-trigger"
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
      className={cn(
        "outline-0 py-1 data-[empty]:p-0",
        "overflow-y-auto scroll-py-2 overscroll-contain",
        className,
      )}
      data-slot="autocomplete-list"
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
      className={cn("outline-none", className)}
      data-slot="autocomplete-positioner"
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
      className={cn(
        "p-3 text-xs text-center text-muted-foreground flex gap-2 items-center empty:m-0 empty:p-0",
        className,
      )}
      data-slot="autocomplete-status"
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
      className={cn(
        "p-3 text-xs text-center text-muted-foreground empty:m-0 empty:p-0",
        className,
      )}
      data-slot="autocomplete-empty"
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
      className={cn(
        "flex items-center gap-2 py-1.5 pl-3.5 pr-8 text-sm",
        "select-none cursor-default outline-none",
        "highlight-on-active",
        "[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      data-slot="autocomplete-item"
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
      className={cn("mb-1 last:mb-0", className)}
      data-slot="autocomplete-group"
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
      className={cn(
        "px-3.5 py-1.5 text-xs text-muted-foreground font-medium",
        className,
      )}
      data-slot="autocomplete-group-label"
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
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      data-slot="autocomplete-separator"
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
  addonIcon,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Input> & {
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
      data-slot="autocomplete-input-group"
    >
      {addonIcon && (
        <BaseAutocomplete.Icon
          className="[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground absolute left-1 size-6 flex justify-center items-center"
          data-slot="autocomplete-addon-icon"
        >
          {addonIcon}
        </BaseAutocomplete.Icon>
      )}
      <BaseAutocomplete.Input
        className={cn(
          inputVariants({ inputSize, variant }),
          addonIcon && "pl-7",
          paddingClass,
        )}
        data-slot="autocomplete-input"
        {...props}
      />
      <div className="absolute right-1 top-0 h-full inline-flex items-center">
        {showClear && (
          <BaseAutocomplete.Clear
            aria-label="Clear selection"
            data-slot="autocomplete-clear"
            render={
              <Button
                className="[&_svg]:text-muted-foreground hover:[&_svg]:text-foreground"
                size={"icon-xs"}
                variant="ghost"
              />
            }
          >
            <X />
          </BaseAutocomplete.Clear>
        )}
        {showTrigger && (
          <BaseAutocomplete.Trigger
            data-slot="autocomplete-trigger"
            render={
              <Button
                className="[&_svg]:text-muted-foreground data-popup-open:[&_svg]:text-foreground hover:[&_svg]:text-foreground"
                size={"icon-xs"}
                variant="ghost"
              />
            }
          >
            <BaseAutocomplete.Icon data-slot="autocomplete-icon">
              <ChevronDown className="size-4" />
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
        align={align}
        anchor={positionerAnchor}
        data-slot="autocomplete-positioner"
        sideOffset={sideOffset}
      >
        <BaseAutocomplete.Popup
          className={cn(
            "bg-popover text-popover-foreground rounded-md shadow-md",
            "outline outline-1 outline-border dark:-outline-offset-1",
            "overflow-hidden overflow-y-auto",
            "max-w-[var(--available-width)] max-h-[min(23rem,var(--available-height))]",
            matchAnchorWidth && "w-[var(--anchor-width)]",
            className,
          )}
          data-slot="autocomplete-content"
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
