"use client";

import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { cn } from "@/registry/lib/utils";
import { Button } from "@/registry/ui/button";
import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValue,
} from "@/registry/ui/select";

export function CustomSelect() {
  return (
    <Select<Fruit> items={fruits} itemToStringValue={(fruit) => fruit.value}>
      <SelectTrigger
        render={
          <Button
            className="data-popup-open:bg-accent data-popup-open:hover:bg-accent group/select w-56 justify-between"
            variant="glow"
          />
        }
      >
        <SelectValue
          className="data-placeholder:text-foreground"
          placeholder="Choose your favorite fruit"
        >
          {(selected) => {
            if (!selected) return null;
            return (
              <>
                <span className="mr-2">{selected.emoji}</span>
                <span>{selected.label}</span>
              </>
            );
          }}
        </SelectValue>
        <SelectIcon>
          <ChevronDownIcon className="size-4 text-foreground transition-transform duration-200 group-data-popup-open/select:rotate-180" />
        </SelectIcon>
      </SelectTrigger>

      <SelectPortal>
        <SelectPositioner alignItemWithTrigger={false} sideOffset={6}>
          <SelectPopup
            className={cn(
              "min-w-(--anchor-width) overflow-hidden rounded-md bg-popover text-popover-foreground shadow-primary/20 shadow-2xl",
              "overlay-outline animate-popup", // Keep overlay styling and animation consistent
            )}
          >
            <SelectList className="py-1">
              {fruits.map((fruit) => (
                <SelectItem
                  className={cn(
                    "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-4.5 pr-8 text-sm outline-none",
                    "highlight-on-active", // Keep hit-test highlights consistent
                  )}
                  key={fruit.value}
                  value={fruit}
                >
                  <SelectItemText>
                    <span className="mr-2">{fruit.emoji}</span>
                    <span>{fruit.label}</span>
                  </SelectItemText>
                  <span className="absolute right-4 flex size-4 items-center justify-center">
                    <SelectItemIndicator>
                      <CheckIcon className="size-4 text-primary" />
                    </SelectItemIndicator>
                  </span>
                </SelectItem>
              ))}
            </SelectList>
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </Select>
  );
}

type Fruit = {
  label: string;
  value: string;
  emoji: string;
};

const fruits: Fruit[] = [
  { emoji: "🍎", label: "Apple", value: "apple" },
  { emoji: "🍌", label: "Banana", value: "banana" },
  { emoji: "🫐", label: "Blueberry", value: "blueberry" },
  { emoji: "🍇", label: "Grapes", value: "grapes" },
  { emoji: "🍍", label: "Pineapple", value: "pineapple" },
];
