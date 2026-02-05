"use client";

import { Button } from "@/registry/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/ui/field";
import { Form } from "@/registry/ui/form";
import { NumberField } from "@/registry/ui/number-field";
import { toast } from "@/registry/ui/toast";

export function NumberFieldDemo() {
  return (
    <Form
      aria-label="Number field form"
      className="w-64"
      onFormSubmit={(value) =>
        toast.success({
          description: JSON.stringify(value),
          title: "Form submitted",
        })
      }
    >
      <Field name="quantity">
        <FieldLabel>Quantity</FieldLabel>
        <NumberField defaultValue={undefined} max={99} min={1} required />
        <FieldDescription>
          Please enter a quantity between 1 and 99
        </FieldDescription>
        <FieldError />
      </Field>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
