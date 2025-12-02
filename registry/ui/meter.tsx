"use client"

import * as React from "react"
import { Meter as BaseMeter } from "@base-ui-components/react/meter"

import { cn } from "@/lib/utils"

/**
 * A simple Meter bar, mirroring the API of the Progress component.
 * Use this when you don't need the custom Label/Value layout.
 */
function Meter({
  ref,
  className,
  value,
  ...props
}: React.ComponentProps<typeof BaseMeter.Root>) {
  return (
    <BaseMeter.Root
      ref={ref}
      value={value}
      className={cn("relative w-full", className)}
      {...props}
    >
      <BaseMeter.Track className="relative h-2 w-full overflow-hidden rounded-full bg-primary/20">
        <BaseMeter.Indicator className="h-full flex-1 bg-primary transition-all duration-500" />
      </BaseMeter.Track>
    </BaseMeter.Root>
  )
}

/**
 * Decomposed components for building complex Meter layouts (e.g. with Labels and Values).
 */
const MeterRoot = ({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof BaseMeter.Root>) => (
  <BaseMeter.Root
    ref={ref}
    className={cn("w-full gap-2", className)}
    {...props}
  />
)

const MeterTrack = ({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof BaseMeter.Track>) => (
  <BaseMeter.Track
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className
    )}
    {...props}
  />
)

const MeterIndicator = ({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof BaseMeter.Indicator>) => (
  <BaseMeter.Indicator
    ref={ref}
    className={cn(
      "h-full flex-1 bg-primary transition-all duration-500",
      className
    )}
    {...props}
  />
)

const MeterLabel = ({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof BaseMeter.Label>) => (
  <BaseMeter.Label
    ref={ref}
    className={cn("text-sm font-medium leading-none", className)}
    {...props}
  />
)

const MeterValue = ({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof BaseMeter.Value>) => (
  <BaseMeter.Value
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
)

export {
  Meter,
  MeterRoot,
  MeterTrack,
  MeterIndicator,
  MeterLabel,
  MeterValue,
}