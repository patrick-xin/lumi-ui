"use client";

import { ChevronsUpDownIcon, CircleIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItemContent,
  SelectTriggerGroup,
} from "@/registry/ui/select";

export const SelectTriggerGroupDemo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <Select items={fruits}>
            <SelectTriggerGroup
              className="data-popup-open:[&_svg]:rotate-180"
              label="Animate icon"
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
        </div>
        <div className="flex flex-col gap-2">
          <Select items={fruits}>
            <SelectTriggerGroup
              indicatorIcon={<ChevronsUpDownIcon />}
              indicatorPlacement="start"
              label="Icon placement"
              placeholder="Select a fruit"
            />
            <SelectContent>
              {fruits.map((fruit) => (
                <SelectItemContent
                  indicatorPlacement="start"
                  key={fruit.value}
                  value={fruit.value}
                >
                  {fruit.label}
                </SelectItemContent>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <Select items={fruits}>
            <SelectTriggerGroup
              indicatorPlacement="start"
              label="Icon placement with alignItemWithTrigger"
              placeholder="Select a fruit"
            />
            <SelectContent alignItemWithTrigger>
              {fruits.map((fruit) => (
                <SelectItemContent
                  indicatorPlacement="start"
                  key={fruit.value}
                  value={fruit.value}
                >
                  {fruit.label}
                </SelectItemContent>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Select items={fruits}>
            <SelectTriggerGroup
              label="Change icon inside popup"
              placeholder="Select a fruit"
            />
            <SelectContent alignItemWithTrigger>
              {fruits.map((fruit) => (
                <SelectItemContent
                  indicatorIcon={<CircleIcon />}
                  key={fruit.value}
                  value={fruit.value}
                >
                  {fruit.label}
                </SelectItemContent>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
];
