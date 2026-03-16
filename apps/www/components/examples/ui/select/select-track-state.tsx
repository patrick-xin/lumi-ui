"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItemContent,
  SelectTriggerGroup,
} from "@/registry/ui/select";

const frameworks = [
  { label: "Next.js", value: "next" },
  { label: "Svelte Kit", value: "svelte" },
  { label: "Astro", value: "astro" },
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
        onValueChange={(val) => setValue(val as string)}
        value={value}
      >
        <SelectTriggerGroup label="Framework" placeholder="Select framework" />
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
