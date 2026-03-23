"use client";

import * as React from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItemContent,
  ComboboxList,
} from "@/registry/tv/combobox";
import { Input } from "@/registry/tv/input";
import { Label } from "@/registry/ui/label";

export function ComboboxBasic() {
  const id = React.useId();
  return (
    <div className="flex items-center gap-2">
      <Combobox items={frameworks}>
        <Label htmlFor={id}>Framework</Label>
        <ComboboxInput
          aria-label="Choose a framework"
          className="w-52"
          id={id}
          inputSize="sm"
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
      <Input inputSize="sm" />
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
