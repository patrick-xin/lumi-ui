import { Label } from "@/registry/ui/label";
import { Radio, RadioGroup } from "@/registry/ui/radio";

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <Label className="flex items-center gap-3 text-sm" htmlFor="r1">
        <Radio id="r1" value="default" />
        Default
      </Label>
      <Label className="flex items-center gap-3 text-sm" htmlFor="r2">
        <Radio id="r2" value="comfortable" />
        Comfortable
      </Label>
      <Label className="flex items-center gap-3 text-sm" htmlFor="r3">
        <Radio id="r3" value="compact" />
        Compact
      </Label>
    </RadioGroup>
  );
}
