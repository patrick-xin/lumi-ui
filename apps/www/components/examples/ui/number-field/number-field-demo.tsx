import { Field, FieldLabel } from "@lumi-ui/ui/field";
import { NumberField } from "@lumi-ui/ui/number-field";

export function NumberFieldDemo() {
  return (
    <Field className="w-32">
      <FieldLabel>Quantity</FieldLabel>
      <NumberField defaultValue={10} max={99} min={0} />
    </Field>
  );
}
