import { Field, FieldItem, FieldLabel } from "@/registry/ui/field";
import {
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
} from "@/registry/ui/fieldset";
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group";

export function FieldRadio() {
  return (
    <div className="w-full max-w-md">
      <Field>
        <Fieldset render={<RadioGroup defaultValue="ssd" />}>
          <FieldsetLegend>Subscription Plan</FieldsetLegend>
          <FieldsetDescription>
            Yearly and lifetime plans offer significant savings.
          </FieldsetDescription>
          <FieldItem>
            <RadioGroupItem value="monthly" />
            <FieldLabel className="font-normal">
              Monthly ($9.99/month)
            </FieldLabel>
          </FieldItem>
          <FieldItem>
            <RadioGroupItem value="yearly" />
            <FieldLabel className="font-normal">
              Yearly ($99.99/month)
            </FieldLabel>
          </FieldItem>
        </Fieldset>
      </Field>
    </div>
  );
}
