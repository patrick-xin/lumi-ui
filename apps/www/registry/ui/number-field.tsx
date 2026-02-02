"use client";

import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import { Minus, Plus } from "lucide-react";
import type * as React from "react";

import { cn } from "@/registry/lib/utils";

const NumberFieldRoot = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Root>) => (
  <BaseNumberField.Root
    className={cn("grid gap-1.5", className)}
    data-slot="number-field"
    {...props}
  />
);

const NumberFieldGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Group>) => (
  <BaseNumberField.Group
    className={cn(
      "w-full overflow-hidden data-[disabled]:opacity-50",
      className,
    )}
    data-slot="number-field-group"
    {...props}
  />
);

const NumberFieldInput = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Input>) => (
  <BaseNumberField.Input
    className={cn(
      "tabular-nums outline-none",
      "focus-visible:outline focus-visible:outline-ring focus-visible:ring-4 focus-visible:ring-ring/10",
      "aria-invalid:outline aria-invalid:outline-destructive/80 aria-invalid:ring-4 aria-invalid:ring-destructive/20",
      className,
    )}
    data-slot="number-field-input"
    {...props}
  />
);

const NumberFieldDecrement = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Decrement>) => (
  <BaseNumberField.Decrement
    className={cn(
      "flex items-center justify-center select-none",
      "disabled:opacity-50",
      className,
    )}
    data-slot="number-field-decrement"
    {...props}
  >
    {children}
  </BaseNumberField.Decrement>
);

const NumberFieldIncrement = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Increment>) => (
  <BaseNumberField.Increment
    className={cn(
      "flex items-center justify-center select-none",
      "disabled:opacity-50",
      className,
    )}
    data-slot="number-field-increment"
    {...props}
  >
    {children}
  </BaseNumberField.Increment>
);

const NumberFieldScrubAreaRoot = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.ScrubArea>) => (
  <BaseNumberField.ScrubArea
    className={cn("cursor-ew-resize", className)}
    data-slot="number-field-scrub-area"
    {...props}
  />
);

const NumberFieldScrubAreaCursor = (
  props: React.ComponentProps<typeof BaseNumberField.ScrubAreaCursor>,
) => (
  <BaseNumberField.ScrubAreaCursor
    data-slot="number-field-scrub-area"
    {...props}
  />
);

function CursorGrowIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="black"
      height="14"
      stroke="white"
      viewBox="0 0 24 14"
      width="26"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>cursor icon</title>
      <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
    </svg>
  );
}

const NumberFieldScrubArea = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseNumberField.ScrubArea>) => (
  <BaseNumberField.ScrubArea
    className={cn(
      "flex cursor-ew-resize items-center gap-1.5 select-none text-sm font-medium text-foreground data-[disabled]:opacity-50",
      className,
    )}
    data-slot="number-field-scrub-area"
    {...props}
  >
    <BaseNumberField.ScrubAreaCursor data-slot="number-field-scrub-area-cursor">
      <CursorGrowIcon />
    </BaseNumberField.ScrubAreaCursor>
    {children}
  </BaseNumberField.ScrubArea>
);

function NumberField({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Root>) {
  return (
    <BaseNumberField.Root
      className="flex flex-col gap-2 data-[disabled]:opacity-50  data-[disabled]:pointer-events-none"
      data-slot="number-field"
      {...props}
    >
      {children}
      <BaseNumberField.Group
        className={cn(
          "flex h-9 w-full overflow-hidden rounded-md border border-input bg-transparent shadow-xs",
          "data-[invalid]:border-destructive data-[invalid]:ring-destructive/20",
        )}
        data-slot="number-field-group"
      >
        <BaseNumberField.Decrement
          className={cn(
            "flex items-center justify-center shrink-0 h-full aspect-square",
            "border-r border-input bg-input/60 text-foreground",
            "transition-colors hover:bg-input",
            "data-[disabled]:bg-transparent",
          )}
          data-slot="number-field-decrement"
        >
          <Minus className="size-4" />
        </BaseNumberField.Decrement>
        <BaseNumberField.Input
          className="flex-1 min-w-0 px-2.5 text-center text-sm tabular-nums outline-none rounded-xs placeholder:text-muted-foreground focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/80 data-[invalid]:border-destructive/30 data-[invalid]:ring-1 data-[invalid]:ring-destructive/10 data-[invalid]:ring-offset-1 data-[invalid]:ring-offset-destructive/5"
          data-slot="number-field-input"
        />
        <BaseNumberField.Increment
          className={cn(
            "flex items-center justify-center shrink-0 h-full aspect-square",
            "border-l border-input bg-input/60 text-foreground",
            "transition-colors hover:bg-input",
            "data-[disabled]:bg-transparent",
          )}
          data-slot="number-field-increment"
        >
          <Plus className="size-4" />
        </BaseNumberField.Increment>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  );
}

export {
  NumberFieldRoot,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldIncrement,
  NumberFieldDecrement,
  NumberFieldScrubAreaRoot,
  NumberFieldScrubAreaCursor,
  // Composite component
  NumberField,
  NumberFieldScrubArea,
};
