"use client"

import * as React from "react"
import { Meter as BaseMeter } from "@base-ui-components/react/meter"

import { cn } from "@/lib/utils"

function Meter({
  className,
  value,
  ...props
}: React.ComponentProps<typeof BaseMeter.Root>) {
  return (
    <BaseMeter.Root
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

const MeterRoot = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseMeter.Root>) => (
  <BaseMeter.Root
    className={cn("w-full gap-2", className)}
    {...props}
  />
)

const MeterTrack = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseMeter.Track>) => (
  <BaseMeter.Track
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className
    )}
    {...props}
  />
)

const MeterIndicator = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseMeter.Indicator>) => (
  <BaseMeter.Indicator
    className={cn(
      "h-full flex-1 bg-primary transition-all duration-500",
      className
    )}
    {...props}
  />
)

const MeterLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseMeter.Label>) => (
  <BaseMeter.Label
    className={cn("text-sm font-medium leading-none", className)}
    {...props}
  />
)

const MeterValue = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseMeter.Value>) => (
  <BaseMeter.Value
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