"use client";

import type * as React from "react";
import { Button } from "@/registry/ui/button";
import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "@/registry/ui/field";
import { Form } from "@/registry/ui/form";
import { toast } from "@/registry/ui/toast";

export default function NativeSubmitForm() {
  const handleNativeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData);

    toast.success({
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
