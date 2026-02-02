"use client";

import { Button } from "@/registry/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/registry/ui/field";
import { Form } from "@/registry/ui/form";
import { Switch } from "@/registry/ui/switch";
import { toast } from "@/registry/ui/toast";

export function SwitchEnclosingLabelDemo() {
  return (
    <Form
      aria-label="Switch enclosing label form"
      className="w-64"
      onFormSubmit={(value) =>
        toast.success({
          description: JSON.stringify(value),
          title: "Form submitted",
        })
      }
      validationMode="onSubmit"
    >
      <Field name="notifications-enabled">
        <FieldLabel>
          <Switch /> Enable notifications
        </FieldLabel>
        <FieldDescription>
          Receive email notifications about new messages and updates
        </FieldDescription>
      </Field>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
