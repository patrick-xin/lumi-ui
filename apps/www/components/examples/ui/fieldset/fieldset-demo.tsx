import { Field, FieldControl, FieldLabel } from "@/registry/ui/field";
import { Fieldset, FieldsetLegend } from "@/registry/ui/fieldset";

export function FieldsetDemo() {
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
      </Field>
    </div>
  );
}
