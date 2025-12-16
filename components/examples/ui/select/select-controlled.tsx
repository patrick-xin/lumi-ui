"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/ui/select";
import { Button } from "../../../../registry/ui/button";

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
        <Button onClick={() => setValue("")}>Reset</Button>
      </div>
      <Select
        items={fruits}
        value={value}
        onValueChange={(val) => setValue(val as string)}
      >
        <SelectTrigger>
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
