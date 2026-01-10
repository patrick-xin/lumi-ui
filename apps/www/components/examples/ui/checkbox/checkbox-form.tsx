"use client";

import { Button } from "@/registry/ui/button";
import { Checkbox } from "@/registry/ui/checkbox";
import { Field, FieldLabel } from "@/registry/ui/field";
import { Form } from "@/registry/ui/form";
import { toast } from "@/registry/ui/toast";

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
