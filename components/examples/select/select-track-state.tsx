"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/ui/select";

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "svelte", label: "Svelte Kit" },
  { value: "astro", label: "Astro" },
];

export function FrameworkSelect() {
  const [value, setValue] = React.useState<string>("next");

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Selected value: <strong>{value}</strong>
      </div>
      <Select
        items={frameworks}
        value={value}
        onValueChange={(val) => setValue(val as string)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select framework" />
        </SelectTrigger>
        <SelectContent>
          {frameworks.map((fw) => (
            <SelectItem key={fw.value} value={fw.value}>
              {fw.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
