"use client";

import * as React from "react";

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

export default function SelectControlled() {
  const [value, setValue] = React.useState("apple");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <button
          type="button"
          className="bg-secondary text-secondary-foreground hover:bg-secondary/80 h-8 rounded-md px-3 text-xs"
          onClick={() => setValue("banana")}
        >
          Select Banana
        </button>
        <button
          type="button"
          className="bg-secondary text-secondary-foreground hover:bg-secondary/80 h-8 rounded-md px-3 text-xs"
          onClick={() => setValue("grapes")}
        >
          Select Grapes
        </button>
        <button
          type="button"
          className="bg-secondary text-secondary-foreground hover:bg-secondary/80 h-8 rounded-md px-3 text-xs"
          onClick={() => setValue("")}
        >
          Reset
        </button>
      </div>

      <Select
        items={fruits}
        value={value}
        onValueChange={(val) => setValue(val as string)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          {fruits.map((fruit) => (
            <SelectItem key={fruit.value} value={fruit.value}>
              {fruit.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-muted-foreground text-sm">Selected value: {value}</p>
    </div>
  );
}
