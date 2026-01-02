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
      title: "Success",
      description: `${JSON.stringify(values)} has been submitted!`,
    });
  };

  return (
    <Form
      onFormSubmit={handleSubmit}
      className="flex w-full max-w-64 flex-col gap-4"
    >
      <Field name="username">
        <FieldLabel>Username</FieldLabel>
        <FieldControl
          type="username"
          required
          defaultValue="admin"
          placeholder="e.g. alice132"
        />
        <FieldError />
      </Field>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
