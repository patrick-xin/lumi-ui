import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
} from "@/registry/ui/field";

export function FieldRequiredDemo() {
  return (
    <Field>
      <FieldLabel>Password</FieldLabel>
      <FieldDescription>Must be at least 8 characters long.</FieldDescription>
      <FieldControl required type="password" placeholder="••••••••" />
    </Field>
  );
}
