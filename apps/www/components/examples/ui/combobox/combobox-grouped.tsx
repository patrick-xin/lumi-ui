"use client";

import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInputGroup,
  ComboboxItemContent,
  ComboboxList,
} from "@/registry/ui/combobox";

export function ComboboxGroupedDemo() {
  return (
    <Combobox items={groupedProduce}>
      <ComboboxInputGroup
        showTrigger
        placeholder="Select produce"
        className="w-64"
      />

      <ComboboxContent>
        <ComboboxEmpty>No produce found.</ComboboxEmpty>
        <ComboboxList>
          {(group: ProduceGroup) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxGroupLabel>{group.value}</ComboboxGroupLabel>
              <ComboboxCollection>
                {(item: Produce) => (
                  <ComboboxItemContent key={item.id} value={item}>
                    {item.label}
                  </ComboboxItemContent>
                )}
              </ComboboxCollection>
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

interface Produce {
  id: string;
  label: string;
  group: "Fruits" | "Vegetables";
}

interface ProduceGroup {
  value: string;
  items: Produce[];
}

const produceData: Produce[] = [
  { id: "fruit-apple", label: "Apple", group: "Fruits" },
  { id: "fruit-banana", label: "Banana", group: "Fruits" },
  { id: "fruit-mango", label: "Mango", group: "Fruits" },
  { id: "fruit-kiwi", label: "Kiwi", group: "Fruits" },
  { id: "fruit-grape", label: "Grape", group: "Fruits" },
  { id: "fruit-orange", label: "Orange", group: "Fruits" },
  { id: "fruit-strawberry", label: "Strawberry", group: "Fruits" },
  { id: "fruit-watermelon", label: "Watermelon", group: "Fruits" },
  { id: "veg-broccoli", label: "Broccoli", group: "Vegetables" },
  { id: "veg-carrot", label: "Carrot", group: "Vegetables" },
  { id: "veg-cauliflower", label: "Cauliflower", group: "Vegetables" },
  { id: "veg-cucumber", label: "Cucumber", group: "Vegetables" },
  { id: "veg-kale", label: "Kale", group: "Vegetables" },
  { id: "veg-pepper", label: "Bell pepper", group: "Vegetables" },
  { id: "veg-spinach", label: "Spinach", group: "Vegetables" },
  { id: "veg-zucchini", label: "Zucchini", group: "Vegetables" },
];

function groupProduce(items: Produce[]): ProduceGroup[] {
  const groups: Record<string, Produce[]> = {};
  items.forEach((item) => {
    (groups[item.group] ??= []).push(item);
  });
  const order = ["Fruits", "Vegetables"];
  return order.map((value) => ({ value, items: groups[value] ?? [] }));
}

const groupedProduce: ProduceGroup[] = groupProduce(produceData);
