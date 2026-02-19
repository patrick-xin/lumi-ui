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
          <span className="text-xs font-semibold">Animate icon</span>
          <Select items={fruits}>
            <SelectTriggerGroup
              className="data-[popup-open]:[&_svg]:rotate-180"
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
          <span className="text-xs font-semibold">Icon placement</span>
          <Select items={fruits}>
            <SelectTriggerGroup
              indicatorIcon={<ChevronsUpDownIcon />}
              indicatorPlacement="start"
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
          <span className="text-xs font-semibold">
            Icon placement with alignItemWithTrigger
          </span>
          <Select items={fruits}>
            <SelectTriggerGroup
              indicatorPlacement="start"
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
          <span className="text-xs font-semibold">
            Change icon inside popup
          </span>
          <Select items={fruits}>
            <SelectTriggerGroup placeholder="Select a fruit" />
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
