import {
  Field,
  FieldControl,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/registry/ui/field";
import { Fieldset } from "@/registry/ui/fieldset";

export function FieldInput() {
  return (
    <div className="w-full max-w-md">
      <Fieldset>
        <FieldGroup>
          <Field>
            <FieldLabel>Username</FieldLabel>
            <FieldControl type="text" placeholder="Max Leiter" />
            <FieldDescription>
              Choose a unique username for your account.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel>Password</FieldLabel>
            <FieldDescription>
              Must be at least 8 characters long.
            </FieldDescription>
            <FieldControl type="password" placeholder="••••••••" />
          </Field>
        </FieldGroup>
      </Fieldset>
    </div>
  );
}
