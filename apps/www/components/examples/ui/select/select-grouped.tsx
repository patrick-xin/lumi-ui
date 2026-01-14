"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItemContent,
  SelectTriggerGroup,
} from "@/registry/ui/select";

export function SelectGroupedDemo() {
  return (
    <Select items={[...fruits, ...vegetables, ...proteins]}>
      <SelectTriggerGroup placeholder="Select food" />
      <SelectContent alignItemWithTrigger>
        <SelectGroup>
          <SelectGroupLabel>Fruits</SelectGroupLabel>
          {fruits.map((item) => (
            <SelectItemContent key={item.value} value={item.value}>
              {item.label}
            </SelectItemContent>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectGroupLabel>Vegetables</SelectGroupLabel>
          {vegetables.map((item) => (
            <SelectItemContent key={item.value} value={item.value}>
              {item.label}
            </SelectItemContent>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectGroupLabel>Proteins</SelectGroupLabel>
          {proteins.map((item) => (
            <SelectItemContent key={item.value} value={item.value}>
              {item.label}
            </SelectItemContent>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
];

const vegetables = [
  { label: "Carrot", value: "carrot" },
  { label: "Broccoli", value: "broccoli" },
  { label: "Spinach", value: "spinach" },
];

const proteins = [
  { label: "Chicken", value: "chicken" },
  { label: "Beef", value: "beef" },
  { label: "Tofu", value: "tofu" },
];
