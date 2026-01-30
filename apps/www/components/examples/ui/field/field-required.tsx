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
      <FieldControl placeholder="••••••••" required type="password" />
      <FieldDescription>Must be at least 8 characters long.</FieldDescription>
    </Field>
  );
}
