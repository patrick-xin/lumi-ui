import { Progress as BaseProgress } from "@base-ui/react/progress";

import { cn } from "@/registry/lib/utils";

function ProgressRoot({ className, ...props }: BaseProgress.Root.Props) {
  return (
    <BaseProgress.Root
      className={cn("relative w-full", className)}
      data-slot="progress"
      {...props}
    />
  );
}

function ProgressTrack({ className, ...props }: BaseProgress.Track.Props) {
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
}: BaseProgress.Indicator.Props) {
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

function ProgressLabel({ className, ...props }: BaseProgress.Label.Props) {
  return (
    <BaseProgress.Label
      className={cn("text-sm font-medium", className)}
      data-slot="progress-label"
      {...props}
    />
  );
}

function ProgressValue({ className, ...props }: BaseProgress.Value.Props) {
  return (
    <BaseProgress.Value
      className={cn("text-sm text-muted-foreground", className)}
      data-slot="progress-value"
      {...props}
    />
  );
}

function Progress({ className, value, ...props }: BaseProgress.Root.Props) {
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

export {
  ProgressRoot,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
  // Composite component
  Progress,
};
