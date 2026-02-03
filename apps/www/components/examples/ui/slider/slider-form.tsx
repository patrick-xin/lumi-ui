"use client";

import { Button } from "@/registry/ui/button";
import { Field } from "@/registry/ui/field";
import { Fieldset, FieldsetLegend } from "@/registry/ui/fieldset";
import { Form } from "@/registry/ui/form";
import { Slider } from "@/registry/ui/slider";
import { toast } from "@/registry/ui/toast";

export function SliderForm() {
  return (
    <Form
      aria-label="Budget Range"
      className="w-72"
      onFormSubmit={(value) =>
        toast.success({
          description: `${JSON.stringify(value)}`,
          title: "Budget Range",
        })
      }
    >
      <Field name="budgetRange">
        <Fieldset>
          <FieldsetLegend>Budget Range</FieldsetLegend>
          <Slider
            defaultValue={[5, 20]}
            max={100}
            min={1}
            step={1}
            thumbAlignment="edge"
          />
        </Fieldset>
      </Field>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
