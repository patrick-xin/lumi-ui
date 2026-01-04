import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/ui/field";

export default function FieldErrorDemo() {
  return (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <FieldControl placeholder="Enter your email" type="email" />
      <FieldError>Please enter a valid email address.</FieldError>
      <FieldDescription>
        Type an invalid email and press enter to see the error.
      </FieldDescription>
    </Field>
  );
}
