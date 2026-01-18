"use client";

import * as React from "react";
import { Button } from "@lumi-ui/ui/button";
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

export default function SelectControlledDemo() {
  const [value, setValue] = React.useState("apple");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button onClick={() => setValue("banana")}>Select Banana</Button>
        <Button onClick={() => setValue("grapes")}>Select Grapes</Button>
        <Button variant="outline" onClick={() => setValue("")}>
          Reset
        </Button>
      </div>
      <Select
        items={fruits}
        value={value}
        onValueChange={(val) => setValue(val as string)}
      >
        <SelectTriggerGroup placeholder="Select a fruit" />
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
