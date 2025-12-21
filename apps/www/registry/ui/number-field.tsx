"use client"

import * as React from "react"
import { NumberField as BaseNumberField } from "@base-ui/react/number-field"
import { Minus, Plus } from "lucide-react"

import { cn } from "@/lib/utils"

const NumberField = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Root>) => (
  <BaseNumberField.Root
    data-slot="number-field"
    className={cn("grid gap-1.5", className)}
    {...props}
  />
)

const NumberFieldGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Group>) => (
  <BaseNumberField.Group
    data-slot="number-field-group"
    className={cn(
      "flex h-9 w-full overflow-hidden rounded-md border border-input bg-transparent",
      "shadow-xs",
      "data-[disabled]:opacity-50",
      className
    )}
    {...props}
  />
)

const NumberFieldInput = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Input>) => (
  <BaseNumberField.Input
    data-slot="number-field-input"
    className={cn(
      "flex-1 min-w-0 px-3 text-center text-sm tabular-nums outline-none rounded-xs",
      "placeholder:text-muted-foreground",
      "selection:bg-primary selection:text-primary-foreground",
      "focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/50",
      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      "disabled:cursor-not-allowed",
      className
    )}
    {...props}
  />
)

const NumberFieldDecrement = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Decrement>) => (
  <BaseNumberField.Decrement
    data-slot="number-field-decrement"
    className={cn(
      "flex aspect-square h-full shrink-0 items-center justify-center border-r border-input bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50",
      "focus-visible:z-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ring/50",
      className
    )}
    {...props}
  >
    {children ?? <Minus className="size-4" />}
  </BaseNumberField.Decrement>
)

const NumberFieldIncrement = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Increment>) => (
  <BaseNumberField.Increment
    data-slot="number-field-increment"
    className={cn(
      "flex aspect-square h-full shrink-0 items-center justify-center border-l border-input bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50",
      "focus-visible:z-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ring/50",
      className
    )}
    {...props}
  >
    {children ?? <Plus className="size-4" />}
  </BaseNumberField.Increment>
)

const NumberFieldScrubArea = ({
  className,
  children,
  icon,
  ...props
}: React.ComponentProps<typeof BaseNumberField.ScrubArea> & {
  icon?: React.ReactNode
}) => (
  <BaseNumberField.ScrubArea
    data-slot="number-field-scrub-area"
    className={cn(
      "group flex w-fit cursor-ew-resize items-center gap-1.5 select-none text-sm font-medium leading-none text-muted-foreground transition-colors hover:text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  >
    {children}
    <BaseNumberField.ScrubAreaCursor
      data-slot="number-field-scrub-area-cursor"
      className={cn(
        "drop-shadow-[0_1px_1px_#0008] filter",
        "opacity-0 transition-opacity group-hover:opacity-100 group-active:opacity-100"
      )}
    >
      {icon ?? <CursorGrowIcon />}
    </BaseNumberField.ScrubAreaCursor>
  </BaseNumberField.ScrubArea>
)

function CursorGrowIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="26"
      height="14"
      viewBox="0 0 24 14"
      fill="black"
      stroke="white"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
    </svg>
  )
}

export {
  NumberField,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldIncrement,
  NumberFieldDecrement,
  NumberFieldScrubArea,
}