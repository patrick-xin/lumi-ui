"use client";

import { CheckCheckIcon } from "lucide-react";
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

export function ComboboxIndicatorDemo() {
  const id = React.useId();
  return (
    <Combobox items={frameworks}>
      <div className="flex flex-col gap-2">
        <Label htmlFor={id}>Framework</Label>
        <ComboboxInputGroupContent
          aria-label="Choose a framework"
          className="w-52"
          id={id}
          placeholder="e.g. Next.js"
        />
      </div>
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
