import { Input } from "@/registry/tv/input";
import { Field, FieldDescription, FieldLabel } from "@/registry/ui/field";

export function InputWithLabel() {
  return (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <Input id="email" placeholder="Email" type="email" />
      <FieldDescription>
        We won't send you spam or promotional emails.
      </FieldDescription>
    </Field>
  );
}
