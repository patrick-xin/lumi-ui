"use client";

import { Loader2 } from "lucide-react";
import React from "react";
import { Button } from "@/registry/ui/button";
import { Field, FieldError, FieldLabel } from "@/registry/ui/field";
import { Form } from "@/registry/ui/form";
import { Input } from "@/registry/ui/input";

export function InputWithFormDemo() {
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  return (
    <Form
      errors={errors}
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const value = formData.get("url") as string;

        setLoading(true);
        const response = await submitForm(value);
        const serverErrors = {
          url: response.error,
        };

        setErrors(serverErrors);
        setLoading(false);
      }}
    >
      <Field name="url">
        <FieldLabel>Homepage</FieldLabel>
        <Input
          type="url"
          required
          defaultValue="https://example.com"
          placeholder="https://example.com"
          pattern="https?://.*"
        />
        <FieldError />
      </Field>
      <Button isLoading={loading} type="submit">
        {loading && <Loader2 className="animate-spin" />} Submit
      </Button>
    </Form>
  );
}

async function submitForm(value: string) {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  try {
    const url = new URL(value);

    if (url.hostname.endsWith("example.com")) {
      return { error: "The example domain is not allowed" };
    }
  } catch {
    return { error: "This is not a valid URL" };
  }

  return { success: true };
}
