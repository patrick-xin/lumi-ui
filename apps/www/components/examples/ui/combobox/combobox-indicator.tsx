"use client";

import { CheckCheckIcon } from "lucide-react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInputGroupContent,
  ComboboxItemContent,
  ComboboxList,
} from "@/registry/tv/combobox";

export function ComboboxIndicatorDemo() {
  return (
    <Combobox items={frameworks}>
      <ComboboxInputGroupContent
        aria-label="Choose a framework"
        className="w-52"
        placeholder="e.g. Next.js"
      />
      <ComboboxContent>
        <ComboboxEmpty>No framework found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItemContent
              indicatorIcon={<CheckCheckIcon className="text-foreground" />}
              indicatorPlacement="end"
              key={item}
              value={item}
            >
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
