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
  fruit: z.enum(["apple", "banana", "blueberry", "grapes", "pineapple"], {
    message: "Please select a valid option",
  }),
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
      defaultValues?: DefaultValues;
    }
  | {
      status: "success";
      message: string;
      serverErrors?: FormErrors;
      defaultValues?: DefaultValues;
    };

export function ProfileForm() {
  const [values, setValues] = React.useState({
    fruit: "",
    homepage: "",
    name: "",
  });

  const [state, formAction, pending] = React.useActionState<
    FormState,
    FormData
  >(submitProfile, {
    status: "idle",
  });

  React.useEffect(() => {
    if (state.defaultValues) {
      setValues((prev) => ({
        ...prev,
        ...state.defaultValues,
      }));
    }

    if (state.status === "success") {
      toast.success({
        description: state.message,
        title: "Form submitted successfully",
      });
      setValues({
        fruit: "",
        homepage: "",
        name: "",
      });
    }
  }, [state]);

  return (
    <Form
      action={formAction}
      className="flex w-full max-w-72 flex-col gap-4"
      errors={state.serverErrors}
    >
      <Field aria-required name="name">
        <FieldLabel>Name</FieldLabel>
        <FieldControl
          onChange={(e) =>
            setValues((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Type admin to see error"
          value={values.name}
        />
        <FieldError />
      </Field>

      <Field aria-required name="fruit">
        <FieldLabel>Select a fruit</FieldLabel>
        <FieldDescription>Select apple to see error</FieldDescription>
        <Select
          items={fruits}
          name="fruit"
          onValueChange={(val) => {
            if (val) {
              setValues((prev) => ({ ...prev, fruit: val }));
            }
          }}
          value={values.fruit}
        >
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
        <FieldControl
          onChange={(e) =>
            setValues((prev) => ({ ...prev, homepage: e.target.value }))
          }
          placeholder="https://example.org"
          type="url"
          value={values.homepage}
        />
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
  await new Promise((resolve) => setTimeout(resolve, 500));
  const rawValues = {
    fruit: formData.get("fruit"),
    homepage: formData.get("homepage"),
    name: formData.get("name"),
  } as DefaultValues;

  const result = schema.safeParse(rawValues);

  if (!result.success) {
    return {
      defaultValues: rawValues,
      serverErrors: z.flattenError(result.error).fieldErrors,
      status: "error",
    };
  }

  if (result.data.name.toLowerCase() === "admin") {
    return {
      defaultValues: rawValues,
      serverErrors: { name: ["'admin' is reserved"] },
      status: "error",
    };
  }

  if (result.data.fruit.toLowerCase() === "apple") {
    return {
      defaultValues: rawValues,
      serverErrors: { fruit: ["'apple' is not allowed"] },
      status: "error",
    };
  }

  return {
    defaultValues: {
      fruit: result.data.fruit,
      homepage: result.data.homepage,
      name: result.data.name,
    },
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
