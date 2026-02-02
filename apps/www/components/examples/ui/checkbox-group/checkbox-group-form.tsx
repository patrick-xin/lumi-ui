"use client";

import { Button } from "@/registry/ui/button";
import { Checkbox } from "@/registry/ui/checkbox";
import { CheckboxGroup } from "@/registry/ui/checkbox-group";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldItem,
  FieldLabel,
} from "@/registry/ui/field";
import { Fieldset, FieldsetLegend } from "@/registry/ui/fieldset";
import { Form } from "@/registry/ui/form";
import { toast } from "@/registry/ui/toast";

export function CheckboxGroupFormDemo() {
  return (
    <Form
      aria-label="Fruit selection form"
      className="w-64"
      onFormSubmit={(values) =>
        toast.success({
          description: JSON.stringify(values),
          title: "Form submitted",
        })
      }
    >
      <Field name="fruits">
        <Fieldset render={<CheckboxGroup defaultValue={["fuji-apple"]} />}>
          <FieldsetLegend>Select your favorite fruits</FieldsetLegend>
          <FieldItem className="flex-col items-start">
            <FieldLabel>
              <Checkbox value="fuji-apple" /> Fuji
            </FieldLabel>
            <FieldDescription>Fuji apples are sweet</FieldDescription>
          </FieldItem>
          <FieldItem className="flex-col items-start">
            <FieldLabel>
              <Checkbox value="gala-apple" /> Gala
            </FieldLabel>
            <FieldDescription>Gala apples are crisp</FieldDescription>
          </FieldItem>
          <FieldItem className="flex-col items-start">
            <FieldLabel>
              <Checkbox value="granny-smith-apple" /> Granny Smith
            </FieldLabel>
            <FieldDescription>Granny Smith apples are tart</FieldDescription>
          </FieldItem>
        </Fieldset>
        <FieldError />
      </Field>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
