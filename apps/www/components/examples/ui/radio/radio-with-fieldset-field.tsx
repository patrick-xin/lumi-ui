"use client";

import { Field, FieldItem, FieldLabel } from "@lumi-ui/ui/field";
import { Fieldset, FieldsetLegend } from "@lumi-ui/ui/fieldset";
import { Radio, RadioGroup } from "@lumi-ui/ui/radio";

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
