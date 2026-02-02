import { Label } from "@/registry/ui/label";
import { NumberField } from "@/registry/ui/number-field";

export function NumberFieldDemo() {
  return (
    <div className="w-32 flex flex-col gap-2">
      <Label>Quantity</Label>
      <NumberField defaultValue={10} max={99} min={0} />
    </div>
  );
}
