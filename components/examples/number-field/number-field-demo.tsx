import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/registry/ui/number-field";
import { Field, FieldLabel } from "../../../registry/ui/field";

export function NumberFieldDemo() {
  return (
    <Field className="w-32">
      <FieldLabel>Quantity</FieldLabel>
      <NumberField defaultValue={10} min={0} max={99}>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </Field>
  );
}
