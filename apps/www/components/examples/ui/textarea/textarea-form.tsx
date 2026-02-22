"use client";

import { Button } from "@/registry/ui/button";
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/ui/field";
import { Form } from "@/registry/ui/form";
import { Textarea } from "@/registry/ui/textarea";
import { toast } from "@/registry/ui/toast";

export function TextareaFormDemo() {
  return (
    <Form
      aria-label="Textarea form"
      className="w-72"
      onFormSubmit={(data) => {
        toast.success({
          description: data.message,
          title: "Success",
        });
      }}
    >
      <Field name="message">
        <FieldLabel>Message</FieldLabel>
        <FieldDescription>Enter your message below</FieldDescription>
        <FieldControl minLength={10} render={<Textarea />} required />
        <FieldError />
      </Field>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
