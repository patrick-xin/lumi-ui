"use client";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/registry/ui/button";
import { Checkbox } from "@/registry/ui/checkbox";
import { Field, FieldLabel } from "@/registry/ui/field";
import { Form } from "@/registry/ui/form";

export function CheckboxFormDemo() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const isAgreed = formData.get("terms") === "on";

    toast({
      type: isAgreed ? "success" : "error",
      title: isAgreed ? "Agreed to terms" : "Did not agree",
      description: isAgreed
        ? "You have agreed to the terms and conditions."
        : "You have not agreed to the terms and conditions.",
    });
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Field name="terms" className="flex items-center gap-2">
          <Checkbox />
          <FieldLabel>Accept terms and conditions</FieldLabel>
        </Field>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}
