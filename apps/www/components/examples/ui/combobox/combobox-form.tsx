"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "@/registry/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInputGroup,
  ComboboxItemContent,
  ComboboxList,
} from "@/registry/ui/combobox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/ui/field";
import { Form } from "@/registry/ui/form";
import { toast } from "@/registry/ui/toast";

export function ComboboxFormDemo() {
  return (
    <Form
      aria-label="Select a framework"
      onFormSubmit={(value) =>
        toast.success({
          description: JSON.stringify(value),
          title: "Form submitted",
        })
      }
    >
      <Field name="framework">
        <FieldLabel>Framework</FieldLabel>
        <FieldDescription>Select your favorite framework</FieldDescription>
        <Combobox items={frameworks} required>
          <ComboboxInputGroup
            addonIcon={<SearchIcon />}
            aria-label="Search framework"
            className="w-64"
            placeholder="e.g. Next.js"
            showClear
            showTrigger
          />
          <ComboboxContent>
            <ComboboxEmpty>No framework found.</ComboboxEmpty>
            <ComboboxList>
              {(item: string) => (
                <ComboboxItemContent key={item} value={item}>
                  {item}
                </ComboboxItemContent>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <FieldError>Framework is required</FieldError>
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
