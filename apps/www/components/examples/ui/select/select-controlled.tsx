"use client";

import * as React from "react";
import { Button } from "@/registry/ui/button";
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

export default function SelectControlledDemo() {
  const [value, setValue] = React.useState("apple");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button onClick={() => setValue("banana")}>Select Banana</Button>
        <Button onClick={() => setValue("grapes")}>Select Grapes</Button>
        <Button onClick={() => setValue("")} variant="outline">
          Reset
        </Button>
      </div>
      <Select
        items={fruits}
        onValueChange={(val) => setValue(val as string)}
        value={value}
      >
        <SelectTriggerGroup label="Fruit" placeholder="Select a fruit" />
        <SelectContent>
          {fruits.map((fruit) => (
            <SelectItemContent key={fruit.value} value={fruit.value}>
              {fruit.label}
            </SelectItemContent>
          ))}
        </SelectContent>
      </Select>
      <p className="text-muted-foreground text-sm">
        Selected value: <span className="text-foreground">{value}</span>
      </p>
    </div>
  );
}
