"use client"

import * as React from "react"
import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset"
import { Separator } from "@/registry/ui/separator"

import { cn } from "@/lib/utils"

function Fieldset({
  className,
  ...props
}: React.ComponentProps<typeof BaseFieldset.Root>) {
  return (
    <BaseFieldset.Root
      data-slot="fieldset"
      className={cn(
        "flex flex-col gap-5",
        "[&_[data-slot=fieldset-legend]+[data-slot=fieldset-description]]:-mt-3.5",
        className
      )}
      {...props}
    />
  )
}

function FieldsetLegend({
  className,
  ...props
}: React.ComponentProps<typeof BaseFieldset.Legend>) {
  return (
    <BaseFieldset.Legend
      data-slot="fieldset-legend"
      className={cn("text-foreground font-medium text-base", className)}
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

function FieldsetSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator className={cn("my-2", className)} {...props}/>
  )
}

export {
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
  FieldsetSeparator,
}