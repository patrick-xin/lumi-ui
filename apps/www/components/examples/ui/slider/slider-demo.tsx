import { Slider } from "@/registry/ui/slider";

export function SliderDemo() {
  return (
    <div className="w-72">
      <Slider
        aria-label="slider-demo"
        defaultValue={[50]}
        max={100}
        step={1}
      />
    </div>
  );
}
