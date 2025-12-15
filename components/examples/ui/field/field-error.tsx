import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "@/registry/ui/field";

export default function FieldErrorDemo() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Press enter to see the error.
      </p>
      <Field>
        <FieldLabel>Email</FieldLabel>
        <FieldControl placeholder="Enter your email" type="email" />
        <FieldError>Please enter a valid email address.</FieldError>
      </Field>
    </div>
  );
}
