import { Checkbox } from "@/registry/ui/checkbox";
import { CheckboxGroup } from "@/registry/ui/checkbox-group";
import {
  Field,
  FieldDescription,
  FieldItem,
  FieldLabel,
  FieldSeparator,
} from "@/registry/ui/field";
import {
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
} from "@/registry/ui/fieldset";

export function FieldCheckbox() {
  return (
    <form className="w-full max-w-md space-y-4">
      <Field name="showDesktopItems">
        <Fieldset render={<CheckboxGroup />}>
          <FieldsetLegend variant="legend">
            Show these items on the desktop
          </FieldsetLegend>
          <FieldsetDescription>
            Select the items you want to show on the desktop.
          </FieldsetDescription>
          <FieldItem>
            <Checkbox defaultChecked />
            <FieldLabel>Hard disks</FieldLabel>
          </FieldItem>
          <FieldItem>
            <Checkbox />
            <FieldLabel>External disks</FieldLabel>
          </FieldItem>
          <FieldItem>
            <Checkbox />
            <FieldLabel>CDs, DVDs, and iPods</FieldLabel>
          </FieldItem>
          <FieldItem>
            <Checkbox />
            <FieldLabel>Connected servers</FieldLabel>
          </FieldItem>
        </Fieldset>
      </Field>
      <FieldSeparator />
      <Field name="syncDesktopDocuments">
        <FieldItem>
          <Checkbox defaultChecked />
          <FieldLabel>Sync Desktop & Documents folders</FieldLabel>
        </FieldItem>
        <FieldDescription>
          Your Desktop & Documents folders are being synced with iCloud Drive.
          You can access them from other devices.
        </FieldDescription>
      </Field>
    </form>
  );
}
