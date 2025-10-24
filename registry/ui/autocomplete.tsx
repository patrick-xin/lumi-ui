"use client";

import { Autocomplete as AutocompletePrimitive } from "@base-ui-components/react/autocomplete";
import { SearchIcon, X } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";

const Autocomplete = AutocompletePrimitive.Root;

function AutocompleteInput({
  className,
  showSearchIcon = false,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Input> & {
  showSearchIcon?: boolean;
}) {
  return (
    <div
      className="relative flex items-center"
      data-slot="command-input-wrapper"
    >
      {showSearchIcon && (
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 shrink-0 opacity-50" />
      )}
      <AutocompletePrimitive.Input
        className={cn(
          "h-9 w-full min-w-0 rounded-md border border-input bg-transparent py-1 text-base shadow-xs",
          "placeholder:text-muted-foreground",
          "selection:bg-primary selection:text-primary-foreground",
          "dark:bg-input/30",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[2px] focus-visible:outline-none",
          "transition-[color,box-shadow]",
          showSearchIcon ? "pl-9 pr-3" : "px-3",
          className,
        )}
        data-slot="autocomplete-input"
        {...props}
      />
    </div>
  );
}

function AutocompletePortal({
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Portal>) {
  return (
    <AutocompletePrimitive.Portal data-slot="autocomplete-portal" {...props} />
  );
}

function AutocompletePositioner({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Positioner>) {
  return (
    <AutocompletePrimitive.Positioner
      data-slot="autocomplete-positioner"
      className={cn("outline-none", className)}
      {...props}
    />
  );
}

function AutocompletePopup({
  children,
  classNames,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 5,
  matchAnchorWidth = true,
  ...props
}: Omit<
  React.ComponentProps<typeof AutocompletePrimitive.Popup>,
  "className"
> & {
  align?: AutocompletePrimitive.Positioner.Props["align"];
  alignOffset?: AutocompletePrimitive.Positioner.Props["alignOffset"];
  side?: AutocompletePrimitive.Positioner.Props["side"];
  sideOffset?: AutocompletePrimitive.Positioner.Props["sideOffset"];
  classNames?: {
    backdrop?: string;
    popup?: string;
    positioner?: string;
  };
  matchAnchorWidth?: boolean;
}) {
  return (
    <AutocompletePortal>
      <AutocompleteBackdrop className={cn(classNames?.backdrop)} />
      <AutocompletePositioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className={cn(classNames?.positioner)}
      >
        <AutocompletePrimitive.Popup
          data-slot="autocomplete-popup"
          className={cn(
            "px-1 py-2 rounded-md bg-popover border border-input",
            "max-h-[min(var(--available-height),23rem)] max-w-[var(--available-width)]",
            "overflow-y-auto scroll-pt-2 scroll-pb-2 overscroll-contain",
            "origin-[var(--transform-origin)] transition-[transform,scale,opacity] duration-100",
            "data-[starting-style]:opacity-0",
            "data-[ending-style]:opacity-0",
            classNames?.popup,
            matchAnchorWidth && "w-[var(--anchor-width)]",
          )}
          {...props}
        >
          {children}
        </AutocompletePrimitive.Popup>
      </AutocompletePositioner>
    </AutocompletePortal>
  );
}

function AutocompleteEmpty({
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Empty>) {
  return (
    <AutocompletePrimitive.Empty
      data-slot="autocomplete-empty"
      className="px-2 py-1 text-sm empty:m-0 empty:p-0"
      {...props}
    />
  );
}

function AutocompleteList({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.List>) {
  return (
    <AutocompletePrimitive.List
      className={cn("space-y-1.5", className)}
      data-slot="autocomplete-list"
      {...props}
    />
  );
}

function AutocompleteItem({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Item>) {
  return (
    <AutocompletePrimitive.Item
      data-slot="autocomplete-item"
      className={cn(
        "relative flex items-center gap-2 rounded-sm cursor-default px-2 py-1 text-base outline-none select-none",
        "transition-[color,box-shadow]",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        "[&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

function AutocompleteValue({
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Value>) {
  return (
    <AutocompletePrimitive.Value data-slot="autocomplete-value" {...props} />
  );
}

function AutocompleteControl({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <span
      data-slot="autocomplete-control"
      className={cn("relative", className)}
      {...props}
    />
  );
}

function AutocompleteTrigger({
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Trigger>) {
  return (
    <AutocompletePrimitive.Trigger
      data-slot="autocomplete-trigger"
      {...props}
    />
  );
}

function AutocompleteIcon({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Icon>) {
  return (
    <AutocompletePrimitive.Icon
      data-slot="autocomplete-icon"
      className={cn("h-4 w-4 opacity-50", className)}
      {...props}
    />
  );
}

function AutocompleteStatus({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Status>) {
  return (
    <AutocompletePrimitive.Status
      data-slot="autocomplete-status"
      className={cn(
        "px-2 py-1.5 text-sm text-muted-foreground empty:m-0 empty:p-0",
        className,
      )}
      {...props}
    />
  );
}

function AutocompleteBackdrop({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Backdrop>) {
  return (
    <AutocompletePrimitive.Backdrop
      data-slot="autocomplete-backdrop"
      className={cn(className)}
      {...props}
    />
  );
}

function AutocompleteCollection({
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Collection>) {
  return (
    <AutocompletePrimitive.Collection
      data-slot="autocomplete-collection"
      {...props}
    />
  );
}

function AutocompleteRow({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Row>) {
  return (
    <AutocompletePrimitive.Row
      data-slot="autocomplete-row"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}

function AutocompleteClear({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Clear>) {
  return (
    <AutocompletePrimitive.Clear
      data-slot="autocomplete-clear"
      className={cn(
        "absolute cursor-pointer top-1/2 -translate-y-1/2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
        "data-[disabled]:pointer-events-none",
        className,
      )}
      {...props}
    >
      {children ? children : <X className="size-3.5" />}
    </AutocompletePrimitive.Clear>
  );
}

function AutocompleteArrow({
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Arrow>) {
  return (
    <AutocompletePrimitive.Arrow data-slot="autocomplete-arrow" {...props} />
  );
}

function AutocompleteGroup({
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Group>) {
  return (
    <AutocompletePrimitive.Group
      data-slot="autocomplete-group"
      className="space-y-1.5"
      {...props}
    />
  );
}

function AutocompleteGroupLabel({
  sticky = false,
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.GroupLabel> & {
  sticky?: boolean;
}) {
  return (
    <AutocompletePrimitive.GroupLabel
      data-slot="autocomplete-group-label"
      className={cn(
        "px-2 py-1.5 text-sm text-muted-foreground",
        sticky && "sticky top-0 z-10 bg-popover",
        className,
      )}
      {...props}
    />
  );
}

function AutocompleteSeparator({
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Separator>) {
  return (
    <AutocompletePrimitive.Separator
      data-slot="autocomplete-separator"
      {...props}
    />
  );
}

export {
  Autocomplete,
  AutocompleteControl,
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
