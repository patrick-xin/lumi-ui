"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInputGroupContent,
  ComboboxItemContent,
  ComboboxList,
} from "@/registry/tv/combobox";
import { Input } from "@/registry/tv/input";

export function ComboboxClearTriggerDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Combobox items={frameworks}>
          <ComboboxInputGroupContent
            addonIcon={null}
            className="w-64"
            clearReplacesTrigger
            id="select-framework"
            placeholder="e.g. Next.js"
            showClear
            showTrigger
            variant="default"
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
        <Input disabled />
      </div>
      <Combobox items={frameworks}>
        <ComboboxInputGroupContent
          addonIcon={null}
          className="w-64"
          id="select-framework"
          placeholder="e.g. Next.js"
          showClear
          showTrigger
          variant="default"
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
