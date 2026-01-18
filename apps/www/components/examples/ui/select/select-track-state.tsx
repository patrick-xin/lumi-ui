"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItemContent,
  SelectTriggerGroup,
} from "@lumi-ui/ui/select";

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "svelte", label: "Svelte Kit" },
  { value: "astro", label: "Astro" },
];

export function SelectTrackStateDemo() {
  const [value, setValue] = React.useState<string>("next");

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Selected value: <span className="text-foreground">{value}</span>
      </div>
      <Select
        items={frameworks}
        value={value}
        onValueChange={(val) => setValue(val as string)}
      >
        <SelectTriggerGroup placeholder="Select framework" />
        <SelectContent>
          {frameworks.map((fw) => (
            <SelectItemContent key={fw.value} value={fw.value}>
              {fw.label}
            </SelectItemContent>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
