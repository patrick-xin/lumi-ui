"use client";

import { Button } from "@lumi-ui/ui/button";
import { Checkbox } from "@lumi-ui/ui/checkbox";
import { Field, FieldLabel } from "@lumi-ui/ui/field";
import { Form } from "@lumi-ui/ui/form";
import { toast } from "@lumi-ui/ui/toast";

export function CheckboxFormDemo() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const isAgreed = formData.get("terms") === "on";

    toast.add({
      description: isAgreed
        ? "You have agreed to the terms and conditions."
        : "You have not agreed to the terms and conditions.",
      title: isAgreed ? "Agreed to terms" : "Did not agree",
    });
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Field>
          <FieldLabel>
            <Checkbox />
            Accept terms and conditions
          </FieldLabel>
        </Field>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}
