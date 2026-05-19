"use client";

import { SearchIcon } from "lucide-react";
import React from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInputGroupContent,
  ComboboxItemContent,
  ComboboxList,
} from "@/registry/ui/combobox";
import { Label } from "@/registry/ui/label";

export function ComboboxClearTriggerDemo() {
  const id = React.useId();
  const id2 = React.useId();
  return (
    <div className="flex flex-col gap-4 flex-wrap">
      <Combobox items={frameworks}>
        <div className="flex flex-col gap-2">
          <Label htmlFor={id}>Framework</Label>
          <ComboboxInputGroupContent
            addonIcon={<SearchIcon />}
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
      <Combobox items={frameworks}>
        <div className="flex flex-col gap-2">
          <Label htmlFor={id2}>Framework</Label>
          <ComboboxInputGroupContent
            addonIcon={<SearchIcon />}
            className="w-64"
            id={id2}
            placeholder="e.g. Next.js"
            showClear
            showTrigger
            variant="transparent"
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
    </div>
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
