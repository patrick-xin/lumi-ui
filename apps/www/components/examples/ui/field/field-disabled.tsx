import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
} from "@lumi-ui/ui/field";

export function FieldDisabledDemo() {
  return (
    <Field disabled className="w-full max-w-md">
      <FieldLabel>Username</FieldLabel>
      <FieldControl type="text" placeholder="Max Leiter" />
      <FieldDescription>
        Choose a unique username for your account.
      </FieldDescription>
    </Field>
  );
}
