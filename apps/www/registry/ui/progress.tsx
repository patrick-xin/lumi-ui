import { Progress as BaseProgress } from "@base-ui/react/progress";
import type * as React from "react";

import { cn } from "@/registry/lib/utils";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof BaseProgress.Root>) {
  return (
    <BaseProgress.Root
      className={cn("relative w-full", className)}
      data-slot="progress"
      value={value}
      {...props}
    >
      <BaseProgress.Track
        className="bg-primary/20 relative h-2 w-full overflow-hidden rounded-full"
        data-slot="progress-track"
      >
        <BaseProgress.Indicator
          className="bg-primary h-full transition-all duration-500 ease-in-out"
          data-slot="progress-indicator"
        />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}

function ProgressRoot({
  className,
  ...props
}: React.ComponentProps<typeof BaseProgress.Root>) {
  return (
    <BaseProgress.Root
      className={cn("relative w-full", className)}
      data-slot="progress"
      {...props}
    />
  );
}

function ProgressTrack({
  className,
  ...props
}: React.ComponentProps<typeof BaseProgress.Track>) {
  return (
    <BaseProgress.Track
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className,
      )}
      data-slot="progress-track"
      {...props}
    />
  );
}

function ProgressIndicator({
  className,
  ...props
}: React.ComponentProps<typeof BaseProgress.Indicator>) {
  return (
    <BaseProgress.Indicator
      className={cn(
        "bg-primary h-full transition-all duration-500 ease-in-out",
        className,
      )}
      data-slot="progress-indicator"
      {...props}
    />
  );
}

function ProgressLabel({
  className,
  ...props
}: React.ComponentProps<typeof BaseProgress.Label>) {
  return (
    <BaseProgress.Label
      className={cn("text-sm font-medium", className)}
      data-slot="progress-label"
      {...props}
    />
  );
}

function ProgressValue({
  className,
  ...props
}: React.ComponentProps<typeof BaseProgress.Value>) {
  return (
    <BaseProgress.Value
      className={cn("text-sm text-muted-foreground", className)}
      data-slot="progress-value"
      {...props}
    />
  );
}

export {
  Progress,
  ProgressRoot,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
};
