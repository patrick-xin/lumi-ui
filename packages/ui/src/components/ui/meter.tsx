import { Meter as BaseMeter } from "@base-ui/react/meter";
import type * as React from "react";

import { cn } from "@lumi-ui/ui/lib/utils";

const MeterRoot = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseMeter.Root>) => (
  <BaseMeter.Root
    className={cn("relative w-full", className)}
    data-slot="meter"
    {...props}
  />
);

const MeterTrack = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseMeter.Track>) => (
  <BaseMeter.Track
    className={cn(
      "relative w-full overflow-hidden",
      className,
    )}
    data-slot="meter-track"
    {...props}
  />
);

const MeterIndicator = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseMeter.Indicator>) => (
  <BaseMeter.Indicator
    className={cn(
      "h-full transition-all duration-500",
      className,
    )}
    data-slot="meter-indicator"
    {...props}
  />
);

const MeterLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseMeter.Label>) => (
  <BaseMeter.Label
    className={cn("text-sm font-medium leading-none", className)}
    data-slot="meter-label"
    {...props}
  />
);

const MeterValue = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseMeter.Value>) => (
  <BaseMeter.Value
    className={cn("text-sm text-muted-foreground", className)}
    data-slot="meter-value"
    {...props}
  />
);

function Meter({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MeterRoot>) {
  return (
    <BaseMeter.Root
      className={cn("relative w-full", className)}
      data-slot="meter"
      {...props}
    >
      <BaseMeter.Track
        className="relative h-2 w-full overflow-hidden rounded-full bg-primary/20"
        data-slot="meter-track"
      >
        <BaseMeter.Indicator
          className="h-full flex-1 bg-primary transition-all duration-500"
          data-slot="meter-indicator"
        />
      </BaseMeter.Track>
      {children}
    </BaseMeter.Root>
  );
}

export {
  MeterRoot,
  MeterTrack,
  MeterIndicator,
  MeterLabel,
  MeterValue,
  // Composite component
  Meter,
};
