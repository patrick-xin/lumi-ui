import { Field, FieldItem, FieldLabel } from "@/registry/ui/field";
import { Fieldset, FieldsetLegend } from "@/registry/ui/fieldset";
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group";

export function RadioGroupWithFieldDemo() {
  return (
    <Field name="storageType" className="mx-auto max-w-sm flex justify-center">
      <Fieldset render={<RadioGroup defaultValue="ssd" />}>
        <FieldsetLegend>Storage type</FieldsetLegend>
        <FieldItem>
          <FieldLabel>SSD</FieldLabel>
          <RadioGroupItem value="ssd" />
        </FieldItem>
        <FieldItem>
          <FieldLabel>HDD</FieldLabel>
          <RadioGroupItem value="hdd" />
        </FieldItem>
      </Fieldset>
    </Field>
  );
}
