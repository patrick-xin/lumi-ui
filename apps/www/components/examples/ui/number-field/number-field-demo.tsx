import { Field, FieldLabel } from "@/registry/ui/field";
import { NumberField } from "@/registry/ui/number-field";

export function NumberFieldDemo() {
  return (
    <Field className="w-32">
      <FieldLabel>Quantity</FieldLabel>
      <NumberField defaultValue={10} max={99} min={0} />
    </Field>
  );
}
