"use client"

import * as React from "react"
import { Slider as BaseSlider } from "@base-ui-components/react/slider"

import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ref,
  ...props
}: React.ComponentProps<typeof BaseSlider.Root>) {
  const thumbCount = React.useMemo(() => {
    const valueToInspect = value ?? defaultValue
    if (Array.isArray(valueToInspect)) return valueToInspect.length
    return 1
  }, [value, defaultValue])

  return (
    <BaseSlider.Root
      ref={ref}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50",
        // Vertical styles for Root
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <BaseSlider.Control
        className={cn(
          "flex w-full items-center py-2",
          "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[orientation=vertical]:px-2 data-[orientation=vertical]:py-0"
        )}
      >
        <BaseSlider.Track
          className={cn(
            "bg-secondary relative h-2 w-full grow rounded-full",
            "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2"
          )}
        >
          <BaseSlider.Indicator
            className={cn(
              "bg-primary absolute h-full rounded-full",
              "data-[orientation=vertical]:w-full"
            )}
          />
          {Array.from({ length: thumbCount }, (_, i) => (
            <BaseSlider.Thumb
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