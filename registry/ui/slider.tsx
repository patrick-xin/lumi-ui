"use client";

import { Slider as BaseSlider } from "@base-ui/react/slider";
import * as React from "react";

import { cn } from "@/lib/utils";

function SliderRoot({
  className,
  ...props
}: React.ComponentProps<typeof BaseSlider.Root>) {
  return (
    <BaseSlider.Root
      data-slot="slider"
      className={cn(
        "relative w-full touch-none select-none",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        "data-[disabled]:opacity-50",
        className,
      )}
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
      data-slot="slider-control"
      className={cn(
        "flex w-full items-center py-2",
        "touch-none select-none",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[orientation=vertical]:px-2 data-[orientation=vertical]:py-0",
        className,
      )}
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
      data-slot="slider-track"
      className={cn(
        "bg-secondary relative h-2 w-full grow rounded-full select-none",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2",
        className,
      )}
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
      data-slot="slider-value"
      className={cn(
        "text-sm font-medium",
        className,
      )}
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
      data-slot="slider-indicator"
      className={cn(
        "bg-primary absolute h-full rounded-full select-none",
        "data-[orientation=vertical]:w-full",
      )}
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
      data-slot="slider-thumb"
      className={cn(
        "border-primary ring-ring/50 block size-4 shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50",
        "has-[:focus-visible]:outline",
        className,
      )}
      {...props}
    />
  );
}

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof BaseSlider.Root>) {
  const thumbCount = React.useMemo(() => {
    const valueToInspect = value ?? defaultValue;
    if (Array.isArray(valueToInspect)) return valueToInspect.length;
    return 1;
  }, [value, defaultValue]);

  return (
    <SliderRoot
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className="flex items-center"
      {...props}
    >
      <SliderControl>
        <SliderTrack>
          <SliderIndicator />
          {Array.from({ length: thumbCount }, (_, i) => (
            <SliderThumb key={i} index={i} />
          ))}
        </SliderTrack>
      </SliderControl>
    </SliderRoot>
  );
}

export {
  Slider,
  SliderRoot,
  SliderControl,
  SliderTrack,
  SliderIndicator,
  SliderThumb,
  SliderValue
};
