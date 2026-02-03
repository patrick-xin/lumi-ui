"use client";

import { Button } from "@/registry/ui/button";
import { Field, FieldItem, FieldLabel } from "@/registry/ui/field";
import { Fieldset, FieldsetLegend } from "@/registry/ui/fieldset";
import { Form } from "@/registry/ui/form";
import { Radio, RadioGroup } from "@/registry/ui/radio";
import { toast } from "@/registry/ui/toast";

export function RadioGroupForm() {
  return (
    <Form
      aria-label="Storage type"
      onFormSubmit={(value) =>
        toast.success({
          description: `${JSON.stringify(value)}`,
          title: "Storage type",
        })
      }
    >
      <Field
        className="mx-auto max-w-sm flex justify-center"
        name="storageType"
      >
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
      <Button type="submit">Submit</Button>
    </Form>
  );
}
