"use client";

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
    <div className="flex flex-col gap-2">
      <Combobox items={frameworks}>
        <Label htmlFor={id}>Framework</Label>
        <ComboboxInputGroupContent
          aria-label="Choose a framework"
          className="w-52"
          id={id}
          placeholder="e.g. Next.js"
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
