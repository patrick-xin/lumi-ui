import { Slider } from "@/registry/ui/slider";

export function VerticalSliderDemo() {
  return (
    <div className="h-56 p-6 flex justify-center">
      <Slider defaultValue={[50]} max={100} orientation="vertical" />
    </div>
  );
}
