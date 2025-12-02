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

export function FieldsetExample() {
  return (
    <div className="flex flex-col gap-4">
      <Fieldset>
        <FieldsetLegend>Personal Information</FieldsetLegend>
        <FieldsetDescription>
          This information will be displayed publicly.
        </FieldsetDescription>

        <FieldGroup>
          <Field>
            <FieldLabel>First Name</FieldLabel>
            <FieldControl placeholder="John" />
          </Field>

          <Field>
            <FieldLabel>Last Name</FieldLabel>
            <FieldControl placeholder="Doe" />
          </Field>
        </FieldGroup>
      </Fieldset>

      <Fieldset>
        <FieldsetLegend>Billing Address</FieldsetLegend>

        <FieldGroup>
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
        </FieldGroup>
      </Fieldset>
    </div>
  );
}
