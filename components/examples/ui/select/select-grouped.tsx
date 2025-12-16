"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/ui/select";

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "blueberry", label: "Blueberry" },
];

const vegetables = [
  { value: "carrot", label: "Carrot" },
  { value: "broccoli", label: "Broccoli" },
  { value: "spinach", label: "Spinach" },
];

const proteins = [
  { value: "chicken", label: "Chicken" },
  { value: "beef", label: "Beef" },
  { value: "tofu", label: "Tofu" },
];

export function SelectGroupedDemo() {
  return (
    <Select items={[...fruits, ...vegetables, ...proteins]}>
      <SelectTrigger>
        <SelectValue placeholder="Select food" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectGroupLabel>Fruits</SelectGroupLabel>
          {fruits.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectGroupLabel>Vegetables</SelectGroupLabel>
          {vegetables.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectGroupLabel>Proteins</SelectGroupLabel>
          {proteins.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
