"use client";

import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
} from "@lumi-ui/ui/autocomplete";
import { Field, FieldDescription, FieldLabel } from "@lumi-ui/ui/field";

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
];

export default function FieldAutocompleteDemo() {
  return (
    <Field>
      <FieldLabel>Fruits</FieldLabel>
      <Autocomplete items={fruits}>
        <AutocompleteInput
          aria-label="Search items"
          placeholder="Search items…"
        />
        <AutocompleteContent>
          <AutocompleteEmpty>No items found.</AutocompleteEmpty>
          <AutocompleteList>
            {(item) => (
              <AutocompleteItem key={item.value} value={item}>
                {item.label}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
      <FieldDescription>Choose your favourite fruit.</FieldDescription>
    </Field>
  );
}
