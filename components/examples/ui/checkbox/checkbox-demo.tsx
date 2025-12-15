import { Checkbox } from "@/registry/ui/checkbox";
import { Field, FieldLabel } from "@/registry/ui/field";

export function CheckboxDemo() {
  return (
    <Field>
      <FieldLabel>
        <Checkbox defaultChecked />
        Enable notifications
      </FieldLabel>
    </Field>
  );
}
