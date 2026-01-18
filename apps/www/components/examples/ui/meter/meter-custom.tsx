"use client";

import React from "react";
import {
  MeterIndicator,
  MeterLabel,
  MeterRoot,
  MeterTrack,
  MeterValue,
} from "@lumi-ui/ui/meter";
import {
  SliderControl,
  SliderIndicator,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from "@lumi-ui/ui/slider";

const max = 100;
const min = 0;

export function GradientMeterSlider() {
  const [value, setValue] = React.useState(50);

  return (
    <div className="space-y-6 w-56">
      <MeterRoot max={max} min={min} value={value}>
        <div className="flex items-center justify-between mb-2">
          <MeterLabel className="font-medium">Increase Value</MeterLabel>
          <MeterValue className="text-sm font-medium" />
        </div>
        <MeterTrack className="relative h-1.5 w-full overflow-hidden rounded-full bg-accent">
          <MeterIndicator
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg"
            data-root={{ max, min, value }}
          />
        </MeterTrack>
      </MeterRoot>

      <SliderRoot
        max={max}
        min={min}
        onValueChange={(value) => setValue(value as number)}
        value={value}
      >
        <SliderControl className="flex w-full items-center py-2">
          <SliderTrack className="relative h-1.5 w-full grow rounded-full bg-accent">
            <SliderIndicator className="absolute h-full rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-50" />
            <SliderThumb className="block size-5 shrink-0 rounded-full border-2 border-indigo-300 bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl transition-transform hover:scale-110 focus-visible:ring-4 focus-visible:ring-purple-300 focus-visible:outline-none cursor-grab active:cursor-grabbing absolute -translate-x-1/2 -translate-y-1/2 top-1/2" />
          </SliderTrack>
        </SliderControl>
      </SliderRoot>
    </div>
  );
}
