"use client";

import { ChevronsUpDownIcon, CircleIcon } from "lucide-react";
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

export const SelectInputGroupDemo = () => {
  return (
    <div className="grid grid-cols-2 gap-6 [&_span]:text-muted-foreground [&_span]:font-semibold [&_span]:text-xs">
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <span>Animate icon</span>
          <Select items={fruits}>
            <SelectTriggerGroup
              placeholder="Select a fruit"
              className="data-[popup-open]:[&_svg]:rotate-180"
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
          <span>Icon placement</span>
          <Select items={fruits}>
            <SelectTriggerGroup
              placeholder="Select a fruit"
              iconPlacement="left"
              icon={<ChevronsUpDownIcon />}
            />
            <SelectContent>
              {fruits.map((fruit) => (
                <SelectItemContent
                  iconPlacement="left"
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
              placeholder="Select a fruit"
              iconPlacement="left"
            />
            <SelectContent alignItemWithTrigger>
              {fruits.map((fruit) => (
                <SelectItemContent
                  iconPlacement="left"
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
                  key={fruit.value}
                  value={fruit.value}
                  icon={<CircleIcon />}
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
