"use client";

import { Button } from "@/registry/ui/button";
import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "@/registry/ui/field";
import { Form } from "@/registry/ui/form";
import { toast } from "@/registry/ui/toast";

export default function OnFormSubmitForm() {
  const handleSubmit = (formValues: Record<string, string>) => {
    const values = formValues;
    toast.success({
      description: `${JSON.stringify(values)} has been submitted!`,
      title: "Success",
    });
  };

  return (
    <Form
      className="flex w-full max-w-64 flex-col gap-4"
      onFormSubmit={handleSubmit}
    >
      <Field name="username">
        <FieldLabel>Username</FieldLabel>
        <FieldControl
          defaultValue="admin"
          placeholder="e.g. alice132"
          required
          type="username"
        />
        <FieldError />
      </Field>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
