"use client";

import type * as React from "react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/registry/ui/button";
import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "@/registry/ui/field";
import { Form } from "@/registry/ui/form";

export default function NativeSubmitForm() {
  const handleNativeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // 1. MUST prevent default browser reload
    event.preventDefault();

    // 2. Extract data using FormData
    const formData = new FormData(event.currentTarget);

    // 3. Convert to object manually to view it
    const values = Object.fromEntries(formData);

    toast({
      title: "Success",
      description: `${values.username} has been submitted!`,
    });
  };

  return (
    <Form
      onSubmit={handleNativeSubmit}
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
