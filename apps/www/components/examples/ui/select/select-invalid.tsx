"use client";

import { Field, FieldLabel } from "@lumi-ui/ui/field";
import {
  Select,
  SelectContent,
  SelectItemContent,
  SelectTriggerGroup,
} from "@lumi-ui/ui/select";

export function SelectInvalidDemo() {
  return (
    <Field invalid>
      <FieldLabel>Favorite Fruit</FieldLabel>
      <Select items={fruits}>
        <SelectTriggerGroup placeholder="Select a fruit" />
        <SelectContent>
          {fruits.map((fruit) => (
            <SelectItemContent key={fruit.value} value={fruit.value}>
              {fruit.label}
            </SelectItemContent>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "blueberry", label: "Blueberry" },
  { value: "grapes", label: "Grapes" },
  { value: "pineapple", label: "Pineapple" },
];
