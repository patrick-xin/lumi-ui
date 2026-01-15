"use client"

import * as React from "react"
import { Radio as BaseRadio } from "@base-ui/react/radio"
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group"
import { CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof BaseRadioGroup>) {
  return (
    <BaseRadioGroup
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

function RadioRoot({
  className,
  ...props
}: React.ComponentProps<typeof BaseRadio.Root>) {
  return (
    <BaseRadio.Root
      data-slot="radio-root"
      className={cn("rounded-full",className)}
      {...props}
    />
  )
}

function RadioIndicator({
  className,
  ...props
}: React.ComponentProps<typeof BaseRadio.Indicator>) {
  return (
    <BaseRadio.Indicator
      data-slot="radio-indicator"
      className={cn("data-[unchecked]:hidden", className)}
      {...props}
    />
  )
}

function Radio({
  className,
  ...props
}: React.ComponentProps<typeof BaseRadio.Root>) { 
  return (
    <BaseRadio.Root
      data-slot="radio"
      className={cn(
        "bg-transparent border-input text-primary dark:bg-input/30",
        "flex aspect-square size-4 shrink-0 items-center justify-center",
        "rounded-full border shadow-xs",
        "transition-[color,box-shadow]",
        "focus-visible:outline focus-visible:outline-ring focus-visible:ring-4 focus-visible:ring-primary/10",
        "aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/10",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <BaseRadio.Indicator
        data-slot="radio-group-indicator"
        className="flex items-center justify-center data-[unchecked]:hidden"
      >
        <CircleIcon className="size-2 fill-primary" />
      </BaseRadio.Indicator>
    </BaseRadio.Root>
  );
}


export { RadioGroup, RadioRoot, RadioIndicator, Radio }