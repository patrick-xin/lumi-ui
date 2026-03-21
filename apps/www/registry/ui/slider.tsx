"use client";

import { Slider as BaseSlider } from "@base-ui/react/slider";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/registry/lib/utils";

function SliderRoot({ className, ...props }: BaseSlider.Root.Props) {
  return (
    <BaseSlider.Root
      className={cn("touch-none select-none", className)}
      data-slot="slider"
      {...props}
    />
  );
}

function SliderLabel({
  children,
  className,
  ...props
}: BaseSlider.Label.Props) {
  return (
    <BaseSlider.Label
      className={cn(
        "text-sm leading-none font-medium cursor-default",
        className,
      )}
      data-slot="slider-label"
      {...props}
    >
      {children}
    </BaseSlider.Label>
  );
}

function SliderControl({ className, ...props }: BaseSlider.Control.Props) {
  return (
    <BaseSlider.Control
      className={cn("touch-none select-none", className)}
      data-slot="slider-control"
      {...props}
    />
  );
}

function SliderTrack({ className, ...props }: BaseSlider.Track.Props) {
  return (
    <BaseSlider.Track
      className={cn("rounded-full select-none", className)}
      data-slot="slider-track"
      {...props}
    />
  );
}

function SliderValue({
  className,
  children,
  ...props
}: BaseSlider.Value.Props) {
  return (
    <BaseSlider.Value
      className={cn("text-sm font-medium", className)}
      data-slot="slider-value"
      {...props}
    >
      {children}
    </BaseSlider.Value>
  );
}

function SliderIndicator({ className, ...props }: BaseSlider.Indicator.Props) {
  return (
    <BaseSlider.Indicator
      className={cn("select-none")}
      data-slot="slider-indicator"
      {...props}
    />
  );
}

function SliderThumb({ className, ...props }: BaseSlider.Thumb.Props) {
  return (
    <BaseSlider.Thumb
      className={cn(
        "data-disabled:pointer-events-none data-disabled:opacity-50 select-none",
        className,
      )}
      data-slot="slider-thumb"
      {...props}
    />
  );
}

const sliderTrackVariants = cva(
  [
    "bg-input relative w-full grow rounded-full select-none",
    "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto",
  ],
  {
    defaultVariants: {
      size: "default",
    },
    variants: {
      size: {
        default: "h-1 data-[orientation=vertical]:w-1",
        lg: "h-1.5 data-[orientation=vertical]:w-1.5",
        sm: "h-0.5 data-[orientation=vertical]:w-0.5",
      },
    },
  },
);

const sliderThumbVariants = cva(
  [
    "outline-1 outline-border ring-primary/30 shrink-0 rounded-full bg-background transition-[color,box-shadow] select-none block",
    "hover:ring-4 data-dragging:has-focus:ring-4",
    "has-focus-visible:outline-2 has-focus-visible:outline-ring has-focus-visible:ring-4",
    "data-invalid:outline-destructive/80 data-invalid:ring-4 data-invalid:ring-destructive/20",
    "data-invalid:has-focus-visible:outline-destructive data-invalid:has-focus-visible:ring-destructive/20",
    "data-disabled:pointer-events-none",
  ],
  {
    defaultVariants: {
      size: "default",
    },
    variants: {
      size: {
        default: "size-3",
        lg: "size-4",
        sm: "size-2.5",
      },
    },
  },
);

function Slider({
  className,
  defaultValue,
  value,
  children,
  inputRef,
  label,
  size = "default",
  thumbLabels,
  ...props
}: BaseSlider.Root.Props &
  VariantProps<typeof sliderThumbVariants> & {
    inputRef?: React.Ref<HTMLInputElement>;
    label?: string;
    thumbLabels?: string[];
  }) {
  const thumbCount = React.useMemo(() => {
    const valueToInspect = value ?? defaultValue;
    if (Array.isArray(valueToInspect)) return valueToInspect.length;
    return 1;
  }, [value, defaultValue]);

  return (
    <BaseSlider.Root
      className={cn(
        "data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full space-y-4",
        "data-disabled:opacity-50 data-disabled:cursor-default",
        className,
      )}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      {...props}
    >
      {(label || children) && (
        <div className="flex items-center justify-between">
          {label && (
            <BaseSlider.Label className="text-sm leading-none font-medium cursor-default">
              {label}
            </BaseSlider.Label>
          )}
          {children}
        </div>
      )}

      <BaseSlider.Control
        className={cn(
          "flex w-full items-center",
          "touch-none select-none",
          "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[orientation=vertical]:px-2 data-[orientation=vertical]:py-0",
        )}
        data-slot="slider-control"
      >
        <BaseSlider.Track
          className={cn(sliderTrackVariants({ size }))}
          data-slot="slider-track"
        >
          <BaseSlider.Indicator
            className={cn(
              "bg-primary/50 absolute h-full rounded-full select-none",
              "data-[orientation=vertical]:w-full",
            )}
            data-slot="slider-indicator"
          />
          {Array.from({ length: thumbCount }, (_, i) => (
            <BaseSlider.Thumb
              aria-label={thumbLabels?.[i]}
              className={cn(sliderThumbVariants({ size }))}
              data-slot="slider-thumb"
              index={i}
              inputRef={i === 0 ? inputRef : undefined}
              key={i}
            />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}

export {
  SliderRoot,
  SliderLabel,
  SliderControl,
  SliderTrack,
  SliderIndicator,
  SliderThumb,
  SliderValue,
  // Composite component
  Slider,
};
