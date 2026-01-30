"use client";

import { Slider as BaseSlider } from "@base-ui/react/slider";
import * as React from "react";

import { cn } from "@/registry/lib/utils";

function SliderRoot({
  className,
  ...props
}: React.ComponentProps<typeof BaseSlider.Root>) {
  return (
    <BaseSlider.Root
      className={cn("touch-none select-none", className)}
      data-slot="slider"
      {...props}
    />
  );
}

function SliderControl({
  className,
  ...props
}: React.ComponentProps<typeof BaseSlider.Control>) {
  return (
    <BaseSlider.Control
      className={cn("touch-none select-none", className)}
      data-slot="slider-control"
      {...props}
    />
  );
}

function SliderTrack({
  className,
  ...props
}: React.ComponentProps<typeof BaseSlider.Track>) {
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
  ...props
}: React.ComponentProps<typeof BaseSlider.Value>) {
  return (
    <BaseSlider.Value
      className={cn("text-sm font-medium", className)}
      data-slot="slider-value"
      {...props}
    />
  );
}

function SliderIndicator({
  className,
  ...props
}: React.ComponentProps<typeof BaseSlider.Indicator>) {
  return (
    <BaseSlider.Indicator
      className={cn("select-none")}
      data-slot="slider-indicator"
      {...props}
    />
  );
}

function SliderThumb({
  className,
  ...props
}: React.ComponentProps<typeof BaseSlider.Thumb>) {
  return (
    <BaseSlider.Thumb
      className={cn(
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      data-slot="slider-thumb"
      {...props}
    />
  );
}

function Slider({
  className,
  defaultValue,
  value,
  children,
  ...props
}: React.ComponentProps<typeof BaseSlider.Root>) {
  const thumbCount = React.useMemo(() => {
    const valueToInspect = value ?? defaultValue;
    if (Array.isArray(valueToInspect)) return valueToInspect.length;
    return 1;
  }, [value, defaultValue]);

  return (
    <BaseSlider.Root
      className="relative flex flex-col gap-2 w-full touch-none select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[disabled]:opacity-50"
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      {...props}
    >
      <BaseSlider.Control
        className={cn(
          "flex w-full items-center py-2",
          "touch-none select-none",
          "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[orientation=vertical]:px-2 data-[orientation=vertical]:py-0",
          className,
        )}
        data-slot="slider-control"
      >
        <BaseSlider.Track
          className={cn(
            "bg-input relative h-2 w-full grow rounded-full select-none",
            "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2",
          )}
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
              className={cn(
                "outline-border ring-ring/50 block size-4 shrink-0 rounded-full border bg-white transition-[color,box-shadow] hover:ring-4 disabled:pointer-events-none disabled:opacity-50",
                "has-[:focus-visible]:ring-4 focus-visible:outline-primary",
              )}
              data-slot="slider-thumb"
              index={i}
              key={i}
            />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
      {children}
    </BaseSlider.Root>
  );
}

export {
  SliderRoot,
  SliderControl,
  SliderTrack,
  SliderIndicator,
  SliderThumb,
  SliderValue,
  // Composite component
  Slider,
};
