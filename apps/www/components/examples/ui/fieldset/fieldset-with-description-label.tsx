import { Field, FieldControl, FieldLabel } from "@/registry/ui/field";
import { Fieldset, FieldsetLegend } from "@/registry/ui/fieldset";

export function FieldsetWithDescriptionLabelDemo() {
  return (
    <div className="border p-6 rounded">
      <Field className="w-80 mx-auto">
        <Fieldset>
          <FieldsetLegend>Personal Information</FieldsetLegend>
          <Field>
            <FieldLabel>First Name</FieldLabel>
            <FieldControl placeholder="John" />
          </Field>
          <Field>
            <FieldLabel>Last Name</FieldLabel>
            <FieldControl placeholder="Doe" />
          </Field>
        </Fieldset>
        <Fieldset>
          <FieldsetLegend>Billing Address</FieldsetLegend>
          <Field>
            <FieldLabel>Street</FieldLabel>
            <FieldControl placeholder="123 Main St" />
          </Field>
          <Field>
            <FieldLabel>City</FieldLabel>
            <FieldControl placeholder="New York" />
          </Field>
          <Field>
            <FieldLabel>ZIP Code</FieldLabel>
            <FieldControl placeholder="10001" />
          </Field>
        </Fieldset>
      </Field>
    </div>
  );
}
