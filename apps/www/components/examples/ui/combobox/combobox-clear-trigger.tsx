"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInputGroup,
  ComboboxItemContent,
  ComboboxList,
} from "@/registry/ui/combobox";

export function ComboboxClearTriggerDemo() {
  return (
    <Combobox items={frameworks}>
      <ComboboxInputGroup
        id="select-framework"
        placeholder="e.g. Next.js"
        className="w-48"
        showTrigger
        showClear
      />
      <ComboboxContent>
        <ComboboxEmpty>No framework found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItemContent key={item} value={item}>
              {item}
            </ComboboxItemContent>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

const frameworks = [
  "Next.js",
  "React",
  "Vue",
  "Nuxt",
  "Svelte",
  "SvelteKit",
  "Angular",
  "Solid",
  "Qwik",
  "Remix",
];
