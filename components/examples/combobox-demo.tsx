"use client";

import { Combobox } from "@base-ui-components/react/combobox";
import * as React from "react";

export function ExampleCombobox() {
  const id = React.useId();
  return (
    <Combobox.Root items={fruits}>
      <div className="relative flex flex-col gap-1 text-sm leading-5 font-medium">
        <label htmlFor={id}>Choose a fruit</label>
        <Combobox.Input
          placeholder="e.g. Apple"
          id={id}
          className="h-10 w-64 rounded-md font-normal border pl-3.5 text-base bg-[canvas] focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800"
        />
        <div className="absolute right-2 bottom-0 flex h-10 items-center justify-center">
          <Combobox.Clear
            className="flex h-10 w-6 items-center justify-center rounded bg-transparent p-0"
            aria-label="Clear selection"
          >
            <ClearIcon className="size-4" />
          </Combobox.Clear>
          <Combobox.Trigger
            className="flex h-10 w-6 items-center justify-center rounded bg-transparent p-0"
            aria-label="Open popup"
          >
            <ChevronDownIcon className="size-4" />
          </Combobox.Trigger>
        </div>
      </div>

      <Combobox.Portal>
        <Combobox.Positioner className="outline-none" sideOffset={4}>
          <Combobox.Popup className="w-[var(--anchor-width)] bg-popover max-h-[min(var(--available-height),23rem)] max-w-[var(--available-width)] origin-[var(--transform-origin)] overflow-y-auto scroll-pt-2 scroll-pb-2 overscroll-contain rounded-md py-2 shadow-lg outline-1 transition-[transform,scale,opacity] data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 dark:shadow-none dark:-outline-offset-1">
            <Combobox.Empty className="px-4 py-2 text-[0.925rem] leading-4 empty:m-0 empty:p-0">
              No fruits found.
            </Combobox.Empty>
            <Combobox.List>
              {(item: string) => (
                <Combobox.Item
                  key={item}
                  value={item}
                  className="grid cursor-default grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-8 pl-4 text-base leading-4 outline-none select-none data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:text-accent-foreground data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-2 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm data-[highlighted]:before:bg-accent"
                >
                  <Combobox.ItemIndicator className="col-start-1">
                    <CheckIcon className="size-3" />
                  </Combobox.ItemIndicator>
                  <div className="col-start-2">{item}</div>
                </Combobox.Item>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="currentcolor"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      {...props}
    >
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
    </svg>
  );
}

function ClearIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

function ChevronDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

const fruits = [
  "Apple",
  "Banana",
  "Orange",
  "Pineapple",
  "Grape",
  "Mango",
  "Strawberry",
  "Blueberry",
  "Raspberry",
  "Blackberry",
  "Cherry",
  "Peach",
  "Pear",
  "Plum",
  "Kiwi",
  "Watermelon",
  "Cantaloupe",
  "Honeydew",
  "Papaya",
  "Guava",
  "Lychee",
  "Pomegranate",
  "Apricot",
  "Grapefruit",
  "Passionfruit",
];
