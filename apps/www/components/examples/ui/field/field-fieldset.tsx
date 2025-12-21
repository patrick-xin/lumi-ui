import { Field, FieldControl, FieldLabel } from "@/registry/ui/field";
import {
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
} from "@/registry/ui/fieldset";

export function FieldFieldsetDemo() {
  return (
    <Fieldset>
      <FieldsetLegend>Address Information</FieldsetLegend>
      <FieldsetDescription>
        We need your address to deliver your order.
      </FieldsetDescription>
      <Field>
        <FieldLabel>Street Address</FieldLabel>
        <FieldControl type="text" placeholder="123 Main St" />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>City</FieldLabel>
          <FieldControl type="text" placeholder="New York" />
        </Field>
        <Field>
          <FieldLabel>Postal Code</FieldLabel>
          <FieldControl type="text" placeholder="90502" />
        </Field>
      </div>
    </Fieldset>
  );
}
