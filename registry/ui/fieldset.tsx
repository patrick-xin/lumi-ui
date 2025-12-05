"use client"

import * as React from "react"
import { Fieldset as BaseFieldset } from "@base-ui-components/react/fieldset"
import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"


function Fieldset({
  className,
  ...props
}: React.ComponentProps<typeof BaseFieldset.Root>) {
  return (
    <BaseFieldset.Root
      data-slot="fieldset"
      className={cn(
        "flex flex-col gap-3",
        className
      )}
      {...props}
    />
  )
}

const fieldsetLegendVariants = cva(
  "text-foreground font-medium",
  {
    variants: {
      variant: {
        legend: "text-base",
        label: "text-sm",
      },
    },
    defaultVariants: {
      variant: "legend",
    },
  }
)

type FieldsetLegendProps = React.ComponentProps<typeof BaseFieldset.Legend> &
  VariantProps<typeof fieldsetLegendVariants>

function FieldsetLegend({
  className,
  variant,
  ...props
}: FieldsetLegendProps) {
  return (
    <BaseFieldset.Legend
      data-slot="fieldset-legend"
      className={cn(fieldsetLegendVariants({ variant }), className)}
      {...props}
    />
  )
}

function FieldsetDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="fieldset-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
}