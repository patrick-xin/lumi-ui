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

export function SelectDisabledDemo() {
  return (
    <div className="flex gap-4">
      <Select items={fruits}>
        <SelectTriggerGroup label="Fruit" placeholder="Select a fruit" />
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
      <Select disabled items={fruits}>
        <SelectTriggerGroup label="Fruit" placeholder="Select a fruit" />
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
