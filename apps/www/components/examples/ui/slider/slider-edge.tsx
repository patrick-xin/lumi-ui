import { Field, FieldLabel } from "@/registry/ui/field";
import { Slider } from "@/registry/ui/slider";

export function EdgeAlignedSliderDemo() {
  return (
    <div className="w-72 flex flex-col gap-6">
      <Field>
        <FieldLabel>Edge Aligned Slider</FieldLabel>
        <Slider defaultValue={[50]} max={100} thumbAlignment="edge" />
      </Field>
      <Field>
        <FieldLabel>Center Aligned Slider</FieldLabel>
        <Slider defaultValue={[50]} max={100} thumbAlignment="center" />
      </Field>
    </div>
  );
}
