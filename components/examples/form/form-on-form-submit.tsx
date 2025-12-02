"use client";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/registry/ui/button";
import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "@/registry/ui/field";
import { Form } from "@/registry/ui/form";

export default function OnFormSubmitForm() {
  const handleSubmit = (formValues: Record<string, string>) => {
    // 1. NO need to call event.preventDefault() (handled by Base UI)
    const values = formValues;

    // 2. Data is already an object
    toast({
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
