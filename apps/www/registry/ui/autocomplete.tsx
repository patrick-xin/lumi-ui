"use client";

import * as React from "react";
import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { Input } from "@/registry/ui/input";

import { cn } from "@/lib/utils";

const Autocomplete = BaseAutocomplete.Root;

function AutocompleteInput({
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Input>) {
  return (
    <BaseAutocomplete.Input
      data-slot="autocomplete-input"
      render={<Input className={cn(className)} />}
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
      className={cn(className)}
      {...props}
    />
  );
}

function AutocompleteClear({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Clear>) {
  return (
    <BaseAutocomplete.Clear
      data-slot="autocomplete-clear"
      className={cn(className)}
      {...props}
    />
  );
}

function AutocompletePortal({
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Portal>) {
  return <BaseAutocomplete.Portal data-slot="autocomplete-portal" {...props} />;
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
  className,
  align = "start",
  sideOffset = 6,
  matchAnchorWidth = true,
  children,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Popup> & {
  align?: BaseAutocomplete.Positioner.Props["align"];
  sideOffset?: BaseAutocomplete.Positioner.Props["sideOffset"];
  matchAnchorWidth?: boolean;
}) {
  return (
    <AutocompletePortal>
      <BaseAutocomplete.Positioner
        sideOffset={sideOffset}
        align={align}
        className="outline-none z-50"
      >
        <BaseAutocomplete.Popup
          data-slot="autocomplete-popup"
          className={cn(
            "bg-popover text-popover-foreground relative bg-clip-padding overflow-hidden rounded-md shadow-md overflow-y-auto",
            "max-h-[23rem] max-w-[var(--available-width)]",
            "outline outline-border dark:-outline-offset-2",
            "animate-popup",
            matchAnchorWidth && "w-[var(--anchor-width)]",
            className,
          )}
          {...props}
        >
          {children}
        </BaseAutocomplete.Popup>
      </BaseAutocomplete.Positioner>
    </AutocompletePortal>
  );
}

function AutocompleteEmpty({
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Empty>) {
  return (
    <BaseAutocomplete.Empty
      data-slot="autocomplete-empty"
      className="px-2 py-1 text-sm empty:m-0 empty:p-0"
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
        "p-1 scroll-py-2 overscroll-contain max-h-[min(23rem,var(--available-height))] overflow-y-auto data-[empty]:p-0",
        className,
      )}
      {...props}
    />
  );
}

function AutocompleteItem({
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Item>) {
  return (
    <BaseAutocomplete.Item
      data-slot="autocomplete-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 px-2 text-sm select-none",
        "outline-hidden transition-colors", 
        "[&_svg:not([class*='text-'])]:text-muted-foreground",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    />
  );
}

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
      data-slot="autocomplete-icon"
      className={cn("h-4 w-4 opacity-50", className)}
      {...props}
    />
  );
}

function AutocompleteStatus({
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Status>) {
  return (
    <BaseAutocomplete.Status
      data-slot="autocomplete-status"
      className={cn(
        "px-3 py-1.5 text-sm text-muted-foreground empty:m-0 empty:p-0",
        className,
      )}
      {...props}
    />
  );
}

function AutocompleteBackdrop({
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Backdrop>) {
  return (
    <BaseAutocomplete.Backdrop
      data-slot="autocomplete-backdrop"
      className={cn(className)}
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
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Row>) {
  return (
    <BaseAutocomplete.Row
      data-slot="autocomplete-row"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}

function AutocompleteArrow({
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Arrow>) {
  return <BaseAutocomplete.Arrow data-slot="autocomplete-arrow" {...props} />;
}

function AutocompleteGroup({
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Group>) {
  return (
    <BaseAutocomplete.Group
      data-slot="autocomplete-group"
      {...props}
    />
  );
}

function AutocompleteGroupLabel({
  sticky = false,
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.GroupLabel> & {
  sticky?: boolean;
}) {
  return (
    <BaseAutocomplete.GroupLabel
      data-slot="autocomplete-group-label"
      className={cn(
        "px-2 py-1 text-xs text-muted-foreground",
        sticky && "sticky top-0 z-10 bg-popover",
        className,
      )}
      {...props}
    />
  );
}

function AutocompleteSeparator({
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Separator>) {
  return (
    <BaseAutocomplete.Separator data-slot="autocomplete-separator" {...props} />
  );
}

export const useAutoCompleteFilter = BaseAutocomplete.useFilter;

export {
  Autocomplete,
  AutocompleteValue,
  AutocompleteTrigger,
  AutocompleteInput,
  AutocompleteIcon,
  AutocompleteStatus,
  AutocompletePortal,
  AutocompleteBackdrop,
  AutocompletePositioner,
  AutocompletePopup,
  AutocompleteList,
  AutocompleteCollection,
  AutocompleteRow,
  AutocompleteItem,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteEmpty,
  AutocompleteClear,
  AutocompleteArrow,
  AutocompleteSeparator,
};
