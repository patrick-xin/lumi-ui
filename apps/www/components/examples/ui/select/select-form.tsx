"use client";

import { Button } from "@/registry/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/ui/field";
import { Form } from "@/registry/ui/form";
import {
  Select,
  SelectContent,
  SelectItemContent,
  SelectTriggerGroup,
} from "@/registry/ui/select";
import { toast } from "@/registry/ui/toast";

export function SelectFormDemo() {
  return (
    <Form
      aria-label="Select form"
      onFormSubmit={(values) =>
        toast.add({
          description: JSON.stringify(values),
          title: "Form submitted",
        })
      }
    >
      <Field name="fruit">
        <FieldLabel>Select a fruit</FieldLabel>
        <FieldDescription>
          Choose your favorite fruit from the list below.
        </FieldDescription>
        <Select items={fruits} required>
          <SelectTriggerGroup className="w-48" placeholder="Select a fruit" />
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
      <Button type="submit">Submit</Button>
    </Form>
  );
}

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
];
