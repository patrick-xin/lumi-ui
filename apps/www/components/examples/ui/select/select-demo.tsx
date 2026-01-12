"use client";

import {
  Select,
  SelectContent,
  SelectItemContent,
  SelectTriggerGroup,
} from "@/registry/ui/select";

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
];

export function SelectDemo() {
  return (
    <Select items={fruits}>
      <SelectTriggerGroup placeholder="Select a fruit" size="lg" />
      <SelectContent>
        {fruits.map((fruit) => (
          <SelectItemContent key={fruit.value} value={fruit.value}>
            {fruit.label}
          </SelectItemContent>
        ))}
      </SelectContent>
    </Select>
  );
}
