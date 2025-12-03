import { Field, FieldItem, FieldLabel } from "@/registry/ui/field";
import { Fieldset, FieldsetLegend } from "@/registry/ui/fieldset";
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group";

export function RadioGroupWithFieldDemo() {
  return (
    <Field name="storageType">
      <Fieldset render={<RadioGroup defaultValue="ssd" />}>
        <FieldsetLegend>Storage type</FieldsetLegend>
        <FieldItem>
          <FieldLabel>
            <RadioGroupItem value="ssd" />
            SSD
          </FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel>
            <RadioGroupItem value="hdd" />
            HDD
          </FieldLabel>
        </FieldItem>
      </Fieldset>
    </Field>
  );
}
