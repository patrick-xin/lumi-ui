import { Checkbox } from "@lumi-ui/ui/checkbox";
import { CheckboxGroup } from "@lumi-ui/ui/checkbox-group";
import {
  Field,
  FieldDescription,
  FieldItem,
  FieldLabel,
} from "@lumi-ui/ui/field";
import {
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
} from "@lumi-ui/ui/fieldset";

export function FieldCheckboxGroupDemo() {
  return (
    <form className="w-full space-y-4">
      <Field name="showDesktopItems">
        <Fieldset render={<CheckboxGroup />}>
          <FieldsetLegend>Show these items on the desktop</FieldsetLegend>
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
