"use client";

import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
} from "@/registry/ui/autocomplete";
import { Field, FieldDescription, FieldLabel } from "@/registry/ui/field";

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "blueberry", label: "Blueberry" },
  { value: "grapes", label: "Grapes" },
  { value: "pineapple", label: "Pineapple" },
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
        <AutocompletePopup>
          <AutocompleteEmpty>No items found.</AutocompleteEmpty>
          <AutocompleteList>
            {(item) => (
              <AutocompleteItem key={item.value} value={item}>
                {item.label}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>
      <FieldDescription>Choose your favourite fruit.</FieldDescription>
    </Field>
  );
}
