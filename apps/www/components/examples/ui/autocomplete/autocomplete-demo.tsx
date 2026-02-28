"use client";

import { SearchIcon } from "lucide-react";
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
} from "@/registry/ui/autocomplete";

export function AutocompleteDemo() {
  return (
    <Autocomplete items={tags}>
      <AutocompleteInputGroup
        addonIcon={<SearchIcon />}
        aria-label="Search framework"
        className="w-64"
        placeholder="e.g. Next.js"
        showClear
        showTrigger
      />

      <AutocompleteContent sideOffset={12}>
        <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
        <AutocompleteList>
          {(tag: Tag) => (
            <AutocompleteItem key={tag.id} value={tag}>
              {tag.value}
            </AutocompleteItem>
          )}
        </AutocompleteList>
      </AutocompleteContent>
    </Autocomplete>
  );
}

interface Tag {
  id: string;
  value: string;
}

const tags: Tag[] = [
  { id: "next-js", value: "Next.js" },
  { id: "react", value: "React" },
  { id: "vue", value: "Vue" },
  { id: "svelte", value: "Svelte" },
  { id: "svelteKit", value: "SvelteKit" },
  { id: "angular", value: "Angular" },
  { id: "solid", value: "Solid" },
  { id: "qwik", value: "Qwik" },
  { id: "remix", value: "Remix" },
];
