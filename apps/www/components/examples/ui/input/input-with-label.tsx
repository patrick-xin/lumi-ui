import { Field, FieldDescription, FieldLabel } from "@lumi-ui/ui/field";
import { Input } from "@lumi-ui/ui/input";

export function InputWithLabel() {
  return (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <Input type="email" id="email" placeholder="Email" />
      <FieldDescription>
        We won't send you spam or promotional emails.
      </FieldDescription>
    </Field>
  );
}
