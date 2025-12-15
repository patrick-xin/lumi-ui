import { Field, FieldItem, FieldLabel } from "@/registry/ui/field";
import {
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
} from "@/registry/ui/fieldset";
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group";

export function FieldRadioGroupDemo() {
  return (
    <Field>
      <Fieldset render={<RadioGroup defaultValue="fuji-apple" />}>
        <FieldsetLegend>Best apple</FieldsetLegend>
        <FieldsetDescription>Choose your favourite apple.</FieldsetDescription>
        <FieldItem>
          <RadioGroupItem value="fuji-apple" />
          <FieldLabel className="font-normal">Fuji</FieldLabel>
        </FieldItem>
        <FieldItem>
          <RadioGroupItem value="gala-apple" />
          <FieldLabel className="font-normal">Gala</FieldLabel>
        </FieldItem>
      </Fieldset>
    </Field>
  );
}
