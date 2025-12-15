import { Slider } from "@/registry/ui/slider";

export function RangeSliderDemo() {
  return (
    <div className="w-56 p-6">
      <Slider defaultValue={[25, 45]} max={100} step={1} />
    </div>
  );
}
