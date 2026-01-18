import { Radio, RadioGroup } from "@lumi-ui/ui/radio";

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <label className="flex items-center gap-3 text-sm" htmlFor="r1">
        <Radio id="r1" value="default" />
        Default
      </label>
      <label className="flex items-center gap-3 text-sm" htmlFor="r2">
        <Radio id="r2" value="comfortable" />
        Comfortable
      </label>
      <label className="flex items-center gap-3 text-sm" htmlFor="r3">
        <Radio id="r3" value="compact" />
        Compact
      </label>
    </RadioGroup>
  );
}
