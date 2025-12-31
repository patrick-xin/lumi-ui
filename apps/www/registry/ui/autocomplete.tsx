"use client";

import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type { VariantProps } from "class-variance-authority";
import { ChevronDown, X } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";
import { type Input, inputVariants } from "@/registry/ui/input";
import { ScrollArea } from "@/registry/ui/scroll-area";

const Autocomplete = BaseAutocomplete.Root;

function AutocompleteInput({
  className,
  variant,
  inputSize,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Input> & {
  variant?: VariantProps<typeof Input>["variant"];
  inputSize?: VariantProps<typeof Input>["inputSize"];
}) {
  return (
    <BaseAutocomplete.Input
      data-slot="autocomplete-input"
      className={cn(inputVariants({ variant, inputSize }), className)}
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
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Popup>) {
  return (
    <BaseAutocomplete.Popup
      data-slot="autocomplete-popup"
      className={cn(className)}
      {...props}
    ></BaseAutocomplete.Popup>
  );
}

function AutocompleteEmpty({
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Empty>) {
  return (
    <BaseAutocomplete.Empty
      data-slot="autocomplete-empty"
      className={cn("p-3 text-sm empty:m-0 empty:p-0", className)}
      {...props}
    />
  );
}

function AutocompleteList({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.List>) {
  return (
    <BaseAutocomplete.List data-slot="autocomplete-list" 
    className={cn("outline-0", className)}
    {...props}>
      {children}
    </BaseAutocomplete.List>
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
        "relative flex items-center gap-2 w-full cursor-default rounded-sm py-2 pr-8 pl-4 text-base select-none outline-none",
        "data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:text-accent-foreground data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-2 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-md data-[highlighted]:before:bg-accent",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
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
        "px-2 py-2 text-sm text-muted-foreground empty:m-0 empty:p-0",
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
      className={cn("bg-black/60",className)}
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
  return <BaseAutocomplete.Group data-slot="autocomplete-group" {...props} />;
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

function AutocompleteInputGroup({
  className,
  showTrigger = false,
  showClear = false,
  variant="transparent",
  inputSize="default",
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
      className={cn("relative w-full min-w-12", className)}
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
              "outline-none p-1 rounded-md bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/60 transition-all pointer-coarse:after:absolute pointer-coarse:after:min-h-10 pointer-coarse:after:min-w-10 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
            )}
          >
            <ChevronDown />
          </BaseAutocomplete.Trigger>
        )}
      </div>
    </div>
  );
}

function AutocompleteContent({
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
      <BaseAutocomplete.Positioner sideOffset={sideOffset} align={align}>
        <BaseAutocomplete.Popup
          data-slot="autocomplete-popup"
          className={cn(
            "group bg-popover text-popover-foreground relative bg-clip-padding overflow-hidden rounded-md max-w-[var(--available-width)] p-1.5",
            "shadow-md shadow-primary/10 outline dark:-outline-offset-2 outline-primary/10",
            matchAnchorWidth && "w-[var(--anchor-width)]",
            className,
          )}
          {...props}
        >
          <ScrollArea
            gradientScrollFade
            noScrollBar
            className="max-h-[min(23rem,var(--available-height))]"
          >
            {children}
          </ScrollArea>
        </BaseAutocomplete.Popup>
      </BaseAutocomplete.Positioner>
    </AutocompletePortal>
  );
}

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
  // Composite components
  AutocompleteInputGroup,
  AutocompleteContent,
};
