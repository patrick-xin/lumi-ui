import {
  Select,
  SelectContent,
  SelectItemContent,
  SelectTriggerGroup,
} from "@/registry/ui/select";

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "blueberry", label: "Blueberry" },
  { value: "grapes", label: "Grapes" },
  { value: "pineapple", label: "Pineapple" },
];

export function SelectAlignItemWithTriggerDemo() {
  return (
    <Select items={fruits}>
      <SelectTriggerGroup placeholder="Select a fruit" />

      <SelectContent alignItemWithTrigger>
        {fruits.map((fruit) => (
          <SelectItemContent key={fruit.value} value={fruit.value}>
            {fruit.label}
          </SelectItemContent>
        ))}
      </SelectContent>
    </Select>
  );
}
