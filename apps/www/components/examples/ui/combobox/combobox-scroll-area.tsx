"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInputGroup,
  ComboboxItemContent,
  ComboboxList,
} from "@/registry/ui/combobox";
import { ScrollArea } from "@/registry/ui/scroll-area";

export function ComboboxScrollAreaDemo() {
  return (
    <Combobox items={frameworks}>
      <ComboboxInputGroup
        className="w-48"
        id="select-framework"
        placeholder="e.g. Next.js"
      />
      <ComboboxContent>
        <ScrollArea
          className="h-32"
          gradientScrollFade
          // add height constraint
          noScrollBar
        >
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItemContent key={item} value={item}>
                {item}
              </ComboboxItemContent>
            )}
          </ComboboxList>
        </ScrollArea>
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
