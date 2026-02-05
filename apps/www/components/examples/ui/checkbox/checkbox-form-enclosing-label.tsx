"use client";

import { Button } from "@/registry/ui/button";
import { Checkbox } from "@/registry/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/ui/field";
import { Form } from "@/registry/ui/form";
import { toast } from "@/registry/ui/toast";

export function CheckboxEnclosingLabelFormDemo() {
  return (
    <Form
      aria-label="Checkbox enclosing label form"
      className="w-64"
      onFormSubmit={(value) =>
        toast.success({
          description: JSON.stringify(value),
          title: "Form submitted",
        })
      }
    >
      <Field name="terms">
        <FieldLabel>
          <Checkbox required /> Accept terms and conditions
        </FieldLabel>
        <FieldDescription>
          By checking this box, you agree to our terms and conditions
        </FieldDescription>
        <FieldError match="valueMissing">
          Please accept the terms and conditions
        </FieldError>
      </Field>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
