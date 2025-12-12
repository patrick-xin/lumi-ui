"use client"

import * as React from "react"
import { Slider as BaseSlider } from "@base-ui/react/slider"

import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof BaseSlider.Root>) {
  const thumbCount = React.useMemo(() => {
    const valueToInspect = value ?? defaultValue
    if (Array.isArray(valueToInspect)) return valueToInspect.length
    return 1
  }, [value, defaultValue])

  return (
    <BaseSlider.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        "data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <BaseSlider.Control
        data-slot="slider-control"
        className={cn(
          "flex w-full items-center py-2",
          "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[orientation=vertical]:px-2 data-[orientation=vertical]:py-0"
        )}
      >
        <BaseSlider.Track
          data-slot="slider-track"
          className={cn(
            "bg-secondary relative h-2 w-full grow rounded-full",
            "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2"
          )}
        >
          <BaseSlider.Indicator
            data-slot="slider-indicator"
            className={cn(
              "bg-primary absolute h-full rounded-full",
              "data-[orientation=vertical]:w-full"
            )}
          />
          {Array.from({ length: thumbCount }, (_, i) => (
            <BaseSlider.Thumb
              data-slot="slider-thumb"
              key={i}
              index={i}
              className="border-primary ring-ring/50 block size-4 shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
            />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  )
}

export { Slider }