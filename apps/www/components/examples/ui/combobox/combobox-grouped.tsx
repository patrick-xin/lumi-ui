"use client";

import React from "react";
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInputGroupContent,
  ComboboxItemContent,
  ComboboxList,
} from "@/registry/ui/combobox";
import { Label } from "@/registry/ui/label";

export function ComboboxGroupedDemo() {
  const id = React.useId();
  return (
    <Combobox items={groupedProduce}>
      <div className="flex flex-col gap-2">
        <Label htmlFor={id}>Fruit</Label>
        <ComboboxInputGroupContent
          className="w-64"
          id={id}
          placeholder="Select fruit"
          showTrigger
        />
      </div>
      <ComboboxContent>
        <ComboboxEmpty>No fruit found.</ComboboxEmpty>
        <ComboboxList>
          {(group: ProduceGroup) => (
            <ComboboxGroup items={group.items} key={group.value}>
              <ComboboxGroupLabel>{group.value}</ComboboxGroupLabel>
              <ComboboxCollection>
                {(item: Produce) => (
                  <ComboboxItemContent
                    indicatorPlacement="end"
                    key={item.id}
                    value={item}
                  >
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
  { group: "Fruits", id: "fruit-apple", label: "Apple" },
  { group: "Fruits", id: "fruit-banana", label: "Banana" },
  { group: "Fruits", id: "fruit-mango", label: "Mango" },
  { group: "Fruits", id: "fruit-kiwi", label: "Kiwi" },
  { group: "Fruits", id: "fruit-grape", label: "Grape" },
  { group: "Fruits", id: "fruit-orange", label: "Orange" },
  { group: "Fruits", id: "fruit-strawberry", label: "Strawberry" },
  { group: "Fruits", id: "fruit-watermelon", label: "Watermelon" },
  { group: "Vegetables", id: "veg-broccoli", label: "Broccoli" },
  { group: "Vegetables", id: "veg-carrot", label: "Carrot" },
  { group: "Vegetables", id: "veg-cauliflower", label: "Cauliflower" },
  { group: "Vegetables", id: "veg-cucumber", label: "Cucumber" },
  { group: "Vegetables", id: "veg-kale", label: "Kale" },
  { group: "Vegetables", id: "veg-pepper", label: "Bell pepper" },
  { group: "Vegetables", id: "veg-spinach", label: "Spinach" },
  { group: "Vegetables", id: "veg-zucchini", label: "Zucchini" },
];

function groupProduce(items: Produce[]): ProduceGroup[] {
  const groups: Record<string, Produce[]> = {};
  items.forEach((item) => {
    (groups[item.group] ??= []).push(item);
  });
  const order = ["Fruits", "Vegetables"];
  return order.map((value) => ({ items: groups[value] ?? [], value }));
}

const groupedProduce: ProduceGroup[] = groupProduce(produceData);
