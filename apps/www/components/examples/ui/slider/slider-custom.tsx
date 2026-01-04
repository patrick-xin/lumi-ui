"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  SliderControl,
  SliderIndicator,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from "@/registry/ui/slider";

export function PriceRangeFilter() {
  const [values, setValues] = React.useState([250, 750]);
  const histogramData = [
    5, 12, 25, 45, 80, 100, 60, 45, 30, 20, 10, 5, 40, 60, 30, 15, 5, 2,
  ];

  return (
    <div className="w-full max-w-md p-6 border rounded-xl shadow-sm">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">
            Price Range
          </div>
          <p className="text-2xl font-bold tracking-tight">
            ${values[0]} - ${values[1]}
          </p>
        </div>
      </div>

      <div className="relative h-30 flex items-end pt-6">
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between h-16 gap-0.5 px-1 opacity-50">
          {histogramData.map((height, i) => {
            const position = (i / (histogramData.length - 1)) * 1000;
            const inRange = position >= values[0] && position <= values[1];

            return (
              <div
                className={cn(
                  "w-full rounded-t-sm transition-colors duration-200",
                  inRange ? "bg-primary" : "bg-muted",
                )}
                key={i}
                style={{ height: `${height}%` }}
              />
            );
          })}
        </div>
        <SliderRoot
          aria-label="price-range-slider"
          className="absolute inset-x-0 -bottom-2"
          max={1000}
          min={0}
          onValueChange={(val) => setValues(val as number[])}
          thumbAlignment="edge"
          value={values}
        >
          <SliderControl>
            <SliderTrack className="h-6 bg-transparent">
              <SliderIndicator className="bg-transparent border-b-2 border-primary w-full top-auto bottom-0" />
            </SliderTrack>

            {values.map((_, i) => (
              <SliderThumb
                className="size-4 rounded-full border border-primary bg-primary shadow-lg hover:scale-110 transition-transform "
                index={i}
                key={i}
              />
            ))}
          </SliderControl>
        </SliderRoot>
      </div>
    </div>
  );
}
