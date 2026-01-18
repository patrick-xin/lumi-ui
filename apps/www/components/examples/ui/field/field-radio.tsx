import { Field, FieldItem, FieldLabel } from "@lumi-ui/ui/field";
import {
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
} from "@lumi-ui/ui/fieldset";
import { Radio, RadioGroup } from "@lumi-ui/ui/radio";

export function FieldRadioGroupDemo() {
  return (
    <Field>
      <Fieldset render={<RadioGroup defaultValue="fuji-apple" />}>
        <FieldsetLegend>Best apple</FieldsetLegend>
        <FieldsetDescription>Choose your favourite apple.</FieldsetDescription>
        <FieldItem>
          <Radio value="fuji-apple" />
          <FieldLabel className="font-normal">Fuji</FieldLabel>
        </FieldItem>
        <FieldItem>
          <Radio value="gala-apple" />
          <FieldLabel className="font-normal">Gala</FieldLabel>
        </FieldItem>
      </Fieldset>
    </Field>
  );
}
