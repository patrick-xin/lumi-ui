import {
  Field,
  FieldDescription,
  FieldItem,
  FieldLabel,
} from "@/registry/ui/field";
import { Fieldset, FieldsetLegend } from "@/registry/ui/fieldset";
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group";

export function FieldRadioGroupDemo() {
  return (
    <Field>
      <Fieldset
        className="bg-red-950 gap-3"
        render={<RadioGroup defaultValue="fuji-apple" />}
      >
        <FieldsetLegend>Best apple</FieldsetLegend>
        <FieldDescription>Choose your favourite apple.</FieldDescription>
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
