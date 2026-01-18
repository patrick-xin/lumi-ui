import { Field, FieldDescription, FieldLabel } from "@lumi-ui/ui/field";
import {
  Select,
  SelectContent,
  SelectItemContent,
  SelectTriggerGroup,
} from "@lumi-ui/ui/select";

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
];

export function FieldSelectDemo() {
  return (
    <Field>
      <FieldLabel>Fruit</FieldLabel>
      <Select items={fruits}>
        <SelectTriggerGroup
          className="w-[180px]"
          placeholder="Select a fruit"
        />
        <SelectContent>
          {fruits.map((fruit) => (
            <SelectItemContent key={fruit.value} value={fruit.value}>
              {fruit.label}
            </SelectItemContent>
          ))}
        </SelectContent>
      </Select>
      <FieldDescription>Select your favourite fruit.</FieldDescription>
    </Field>
  );
}
