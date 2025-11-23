"use client";

import { Label } from "@/registry/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/ui/select";

export function SelectScrollable() {
  // Generate 50 items to force scroll
  const items = Array.from({ length: 50 }, (_, i) => ({
    value: `item-${i + 1}`,
    label: `Option ${i + 1} with a very long label to test text truncation in the trigger`,
  }));

  return (
    <div className="flex flex-col gap-4 w-[280px]">
      <Label className="text-sm font-medium">Scrollable List (50 items)</Label>
      <Select>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
