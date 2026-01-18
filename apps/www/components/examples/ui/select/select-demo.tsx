"use client";

import {
  Select,
  SelectContent,
  SelectItemContent,
  SelectTriggerGroup,
} from "@lumi-ui/ui/select";

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
      <SelectTriggerGroup className="w-48" placeholder="Select a fruit" />
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
