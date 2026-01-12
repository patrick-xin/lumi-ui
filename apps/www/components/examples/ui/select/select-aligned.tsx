import {
  Select,
  SelectContent,
  SelectItemContent,
  SelectTriggerGroup,
} from "@/registry/ui/select";

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
const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
];
