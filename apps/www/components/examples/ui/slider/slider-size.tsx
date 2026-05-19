import { Slider } from "@/registry/ui/slider";

export function SliderSizeDemo() {
  return (
    <div className="w-72 flex flex-col gap-4">
      <Slider defaultValue={[50]} label="Default" max={100} step={1} />
      <Slider defaultValue={[50]} label="Small" max={100} size="sm" step={1} />
      <Slider defaultValue={[50]} label="Large" max={100} size="lg" step={1} />
    </div>
  );
}
