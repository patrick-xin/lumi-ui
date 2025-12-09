import * as React from "react";
import { Meter as BaseMeter } from "@base-ui-components/react/meter";

import { cn } from "@/lib/utils";

const Meter = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseMeter.Root>) => (
  <BaseMeter.Root
    data-slot="meter"
    className={cn("relative w-full", className)}
    {...props}
  />
);

const MeterTrack = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseMeter.Track>) => (
  <BaseMeter.Track
    data-slot="meter-track"
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className,
    )}
    {...props}
  />
);

const MeterIndicator = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseMeter.Indicator>) => (
  <BaseMeter.Indicator
    data-slot="meter-indicator"
    className={cn(
      "h-full flex-1 bg-primary transition-all duration-500",
      className,
    )}
    {...props}
  />
);

const MeterLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseMeter.Label>) => (
  <BaseMeter.Label
    data-slot="meter-label"
    className={cn("text-sm font-medium leading-none", className)}
    {...props}
  />
);

const MeterValue = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseMeter.Value>) => (
  <BaseMeter.Value
    data-slot="meter-value"
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
);

export { Meter, MeterTrack, MeterIndicator, MeterLabel, MeterValue };
