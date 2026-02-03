"use client";

import * as React from "react";
import { z } from "zod";
import { Button } from "@/registry/ui/button";
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/ui/field";
import { Form, type FormErrors } from "@/registry/ui/form";
import {
  Select,
  SelectContent,
  SelectItemContent,
  SelectTriggerGroup,
} from "@/registry/ui/select";
import { toast } from "@/registry/ui/toast";

const schema = z.object({
  fruit: z.enum(["apple", "banana", "blueberry", "grapes", "pineapple"]),
  homepage: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v && v.length > 0 ? v : undefined))
    .pipe(
      z
        .url("Homepage must be a valid URL")
        .refine((value) => !new URL(value).hostname.endsWith("example.com"), {
          message: "The example domain is not allowed",
        })
        .optional(),
    ),
  name: z.string().trim().min(1, "Name is required"),
});

type SchemaInput = z.input<typeof schema>;
type DefaultValues = Partial<SchemaInput>;

type FormState =
  | {
      status: "idle" | "error";
      serverErrors?: FormErrors;
    }
  | {
      status: "success";
      message: string;
      serverErrors?: FormErrors;
    };

export function ProfileForm() {
  const [state, formAction, pending] = React.useActionState<
    FormState,
    FormData
  >(submitProfile, {
    status: "idle",
  });

  React.useEffect(() => {
    if (state.status === "success") {
      toast.success({
        description: state.message,
        title: "Form submitted successfully",
      });
    }
  }, [state]);

  return (
    <Form
      action={formAction}
      aria-label="Profile Form"
      className="flex w-full max-w-72 flex-col gap-4"
      errors={state.serverErrors}
    >
      <Field name="name">
        <FieldLabel>Name</FieldLabel>
        <FieldControl placeholder="Type admin to see error" />
        <FieldError />
      </Field>
      <Field name="fruit">
        <FieldLabel>Select a fruit</FieldLabel>
        <FieldDescription>Select apple to see error</FieldDescription>
        <Select items={fruits}>
          <SelectTriggerGroup className="w-72" placeholder="Select a fruit" />
          <SelectContent>
            {fruits.map((fruit) => (
              <SelectItemContent key={fruit.value} value={fruit.value}>
                {fruit.label}
              </SelectItemContent>
            ))}
          </SelectContent>
        </Select>
        <FieldError />
      </Field>
      <Field name="homepage">
        <FieldLabel>Homepage</FieldLabel>
        <FieldControl placeholder="https://example.org" type="url" />
        <FieldError />
      </Field>
      <Button disabled={pending} type="submit">
        Submit
      </Button>
    </Form>
  );
}

async function submitProfile(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const values = {
    fruit: formData.get("fruit"),
    homepage: formData.get("homepage"),
    name: formData.get("name"),
  } as DefaultValues;

  const result = schema.safeParse(values);

  if (!result.success) {
    return {
      serverErrors: z.flattenError(result.error).fieldErrors,
      status: "error",
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 500));

  if (result.data.name.toLowerCase() === "admin") {
    return {
      serverErrors: { name: ["'admin' is reserved"] },
      status: "error",
    };
  }

  if (result.data.fruit.toLowerCase() === "apple") {
    return {
      serverErrors: { fruit: ["'apple' is not allowed"] },
      status: "error",
    };
  }

  return {
    message: `${JSON.stringify(result.data)}`,
    status: "success",
  };
}

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
];
