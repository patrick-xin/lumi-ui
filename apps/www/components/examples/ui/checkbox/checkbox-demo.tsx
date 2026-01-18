import { Checkbox } from "@lumi-ui/ui/checkbox";
import { Field, FieldLabel } from "@lumi-ui/ui/field";

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
