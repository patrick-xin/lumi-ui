import {
  Field,
  FieldControl,
  FieldGroup,
  FieldLabel,
} from "@/registry/ui/field";
import {
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
} from "@/registry/ui/fieldset";

export function FieldFieldset() {
  return (
    <div className="w-full max-w-md space-y-6">
      <Fieldset>
        <FieldsetLegend>Address Information</FieldsetLegend>
        <FieldsetDescription>
          We need your address to deliver your order.
        </FieldsetDescription>
        <FieldGroup>
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
        </FieldGroup>
      </Fieldset>
    </div>
  );
}
