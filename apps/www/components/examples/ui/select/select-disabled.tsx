"use client";

import {
  Select,
  SelectContent,
  SelectItemContent,
  SelectTriggerGroup,
} from "@lumi-ui/ui/select";

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "blueberry", label: "Blueberry" },
  { value: "grapes", label: "Grapes" },
  { value: "pineapple", label: "Pineapple" },
];

export function SelectDisabledDemo() {
  return (
    <div className="flex gap-4">
      <Select items={fruits}>
        <SelectTriggerGroup placeholder="Select a fruit" />
        <SelectContent>
          {fruits.map((fruit) => (
            <SelectItemContent
              disabled={fruit.value === "blueberry"}
              key={fruit.value}
              value={fruit.value}
            >
              {fruit.label}
            </SelectItemContent>
          ))}
        </SelectContent>
      </Select>
      <Select items={fruits} disabled>
        <SelectTriggerGroup placeholder="Select a fruit" />
        <SelectContent>
          {fruits.map((fruit) => (
            <SelectItemContent key={fruit.value} value={fruit.value}>
              {fruit.label}
            </SelectItemContent>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
