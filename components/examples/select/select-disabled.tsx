"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/ui/select";

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "blueberry", label: "Blueberry" },
  { value: "grapes", label: "Grapes" },
  { value: "pineapple", label: "Pineapple" },
];

export function SelectDisabledDemo() {
  return (
    <Select
      items={fruits}
      // Disable the entire select
      // disabled
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        {fruits.map((fruit) => (
          <SelectItem
            // Disable individual items
            disabled={fruit.value === "blueberry"}
            key={fruit.value}
            value={fruit.value}
          >
            {fruit.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
