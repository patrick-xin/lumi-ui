import { Checkbox } from "@/registry/ui/checkbox";
import { Field, FieldLabel } from "@/registry/ui/field";

export function FieldCheckboxDemo() {
  return (
    <div className="flex flex-col gap-6">
      <Field>
        {/* Syntax 1: seperate Checkbox and FieldLabel */}
        <Checkbox />
        <FieldLabel>Accept terms and conditions</FieldLabel>
      </Field>
      <Field>
        {/* Syntax 2: place Checkbox inside FieldLabel */}
        <FieldLabel>
          <Checkbox />
          Recieve email notification
        </FieldLabel>
      </Field>
    </div>
  );
}
