"use client";

import { CircleAlert } from "lucide-react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInputGroup,
  ComboboxItemContent,
  ComboboxList,
} from "@/registry/ui/combobox";

export function ComboboxDemo() {
  return (
    <Combobox items={frameworks}>
      <ComboboxInputGroup
        aria-label="Choose a framework"
        className="w-52"
        placeholder="e.g. Next.js"
      />
      <ComboboxContent>
        <ComboboxEmpty>No framework found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItemContent
              indicatorIcon={<CircleAlert />}
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
