import { Slider } from "@/registry/ui/slider";

export function SliderDemo() {
  return (
    <div className="w-72 flex flex-col gap-2">
      <Slider defaultValue={[50]} label="Volume" max={100} step={1} />
    </div>
  );
}
