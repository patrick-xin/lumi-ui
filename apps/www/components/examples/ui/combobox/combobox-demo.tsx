"use client";

import { Search } from "lucide-react";
import * as React from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInputGroupContent,
  ComboboxItemContent,
  ComboboxList,
} from "@/registry/ui/combobox";
import { Label } from "@/registry/ui/label";

export function ComboboxDemo() {
  const id = React.useId();
  return (
    <Combobox items={frameworks}>
      <div className="flex flex-col gap-2">
        <Label htmlFor={id}>Framework</Label>
        <ComboboxInputGroupContent
          addonIcon={<Search />}
          aria-label="Choose a framework"
          className="w-64"
          id={id}
          placeholder="e.g. Next.js"
          showClear
          showTrigger
        />
      </div>
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
