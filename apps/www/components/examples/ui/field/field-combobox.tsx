"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInputGroup,
  ComboboxItemContent,
  ComboboxList,
} from "@lumi-ui/ui/combobox";
import { Field, FieldDescription, FieldLabel } from "@lumi-ui/ui/field";

export function FieldComboBoxDemo() {
  return (
    <Field>
      <FieldLabel>Fruits</FieldLabel>
      <Combobox items={fruits}>
        <ComboboxInputGroup
          aria-label="Choose a fruit"
          className="w-48"
          placeholder="e.g. Apple"
        />
        <ComboboxContent>
          <ComboboxEmpty>No fruit found.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItemContent key={item} value={item}>
                {item}
              </ComboboxItemContent>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <FieldDescription>Choose your favourite fruit.</FieldDescription>
    </Field>
  );
}

const fruits = ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"];
