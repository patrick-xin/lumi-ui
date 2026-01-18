import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
} from "@lumi-ui/ui/field";

export function FieldDemo() {
  return (
    <Field>
      <FieldLabel>Username</FieldLabel>
      <FieldControl type="text" placeholder="Patrick" />
      <FieldDescription>
        Choose a unique username for your account.
      </FieldDescription>
    </Field>
  );
}
