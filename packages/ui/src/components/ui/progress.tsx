import * as React from "react"
import { Progress as BaseProgress } from "@base-ui/react/progress"

import { cn } from "@lumi-ui/ui/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof BaseProgress.Root>) {
  return (
    <BaseProgress.Root
      data-slot="progress"
      value={value}
      className={cn("relative w-full", className)}
      {...props}
    >
      <BaseProgress.Track
        data-slot="progress-track"
        className="bg-primary/20 relative h-2 w-full overflow-hidden rounded-full"
      >
        <BaseProgress.Indicator
          data-slot="progress-indicator"
          className="bg-primary h-full transition-all duration-500 ease-in-out"
        />
      </BaseProgress.Track>
    </BaseProgress.Root>
  )
}

function ProgressRoot({
  className,
  ...props
}: React.ComponentProps<typeof BaseProgress.Root>) {
  return (
    <BaseProgress.Root
      data-slot="progress"
      className={cn("relative w-full", className)}
      {...props}
    />
  )
}

function ProgressTrack({
  className,
  ...props
}: React.ComponentProps<typeof BaseProgress.Track>) {
  return (
    <BaseProgress.Track
      data-slot="progress-track"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

function ProgressIndicator({
  className,
  ...props
}: React.ComponentProps<typeof BaseProgress.Indicator>) {
  return (
    <BaseProgress.Indicator
      data-slot="progress-indicator"
      className={cn(
        "bg-primary h-full transition-all duration-500 ease-in-out",
        className
      )}
      {...props}
    />
  )
}

function ProgressLabel({
  className,
  ...props
}: React.ComponentProps<typeof BaseProgress.Label>) {
  return (
    <BaseProgress.Label
      data-slot="progress-label"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  )
}

function ProgressValue({
  className,
  ...props
}: React.ComponentProps<typeof BaseProgress.Value>) {
  return (
    <BaseProgress.Value
      data-slot="progress-value"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Progress,
  ProgressRoot,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
}