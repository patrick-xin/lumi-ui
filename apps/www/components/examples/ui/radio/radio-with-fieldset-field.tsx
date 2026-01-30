"use client";

import { Field, FieldItem, FieldLabel } from "@/registry/ui/field";
import { Fieldset, FieldsetLegend } from "@/registry/ui/fieldset";
import { Radio, RadioGroup } from "@/registry/ui/radio";

export function RadioGroupWithFieldDemo() {
  return (
    <Field className="mx-auto max-w-sm flex justify-center" name="storageType">
      <Fieldset render={<RadioGroup defaultValue="ssd" />}>
        <FieldsetLegend>Storage type</FieldsetLegend>
        <FieldItem>
          <FieldLabel>SSD</FieldLabel>
          <Radio value="ssd" />
        </FieldItem>
        <FieldItem>
          <FieldLabel>HDD</FieldLabel>
          <Radio value="hdd" />
        </FieldItem>
      </Fieldset>
    </Field>
  );
}
