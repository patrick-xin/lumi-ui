"use client";

import { SearchIcon } from "lucide-react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInputGroupContent,
  ComboboxItemContent,
  ComboboxList,
} from "@/registry/tv/combobox";

export function ComboboxClearTriggerDemo() {
  return (
    <Combobox items={frameworks}>
      <ComboboxInputGroupContent
        addonIcon={<SearchIcon />}
        className="w-64"
        id="select-framework"
        placeholder="e.g. Next.js"
        showClear
        showTrigger
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
