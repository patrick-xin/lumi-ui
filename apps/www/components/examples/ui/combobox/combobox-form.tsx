"use client";

import React from "react";
import { z } from "zod";
import { Button } from "@/registry/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInputGroup,
  ComboboxItemContent,
  ComboboxList,
} from "@/registry/ui/combobox";
import { Field, FieldError, FieldLabel } from "@/registry/ui/field";
import { Form } from "@/registry/ui/form";

const schema = z.object({
  framework: z.enum([
    "Next.js",
    "React",
    "Vue",
    "Nuxt",
    "Svelte",
    "SvelteKit",
    "Angular",
    "Solid",
    "Qwik",
    "Remix",
  ]),
});

export function ComboboxFormDemo() {
  const [errors, setErrors] = React.useState({});
  return (
    <Form
      className="w-64 flex flex-col gap-4"
      errors={errors}
      onFormSubmit={async (formValues) => {
        const result = schema.safeParse(formValues);

        if (!result.success) {
          setErrors(z.flattenError(result.error).fieldErrors);
          return;
        }

        setErrors({});
        alert("Success: " + JSON.stringify(result.data));
      }}
    >
      <Field name="framework">
        <FieldLabel>Framework</FieldLabel>
        <Combobox items={frameworks}>
          <ComboboxInputGroup placeholder="e.g. Next.js" />
          <ComboboxContent>
            <ComboboxEmpty>No framework found.</ComboboxEmpty>
            <ComboboxList>
              {(item: string) => (
                <ComboboxItemContent
                  className="data-[highlighted]:before:inset-x-4 pl-5"
                  key={item}
                  value={item}
                >
                  {item}
                </ComboboxItemContent>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <FieldError className="break-all" />
      </Field>
      <Button type="submit">Submit</Button>
    </Form>
  );
}

const frameworks = [
  "Next.js",
  "React",
  "Vue",
  "Nuxt",
  "Svelte",
  "SvelteKit",
  "Angular",
  "Solid",
  "Qwik",
  "Remix",
];
