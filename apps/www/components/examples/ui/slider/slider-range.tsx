import { Slider, SliderValue } from "@/registry/ui/slider";

export function RangeSliderDemo() {
  return (
    <div className="w-56 p-6">
      <Slider
        defaultValue={[25, 45]}
        label="Range Slider"
        max={100}
        step={1}
        thumbLabels={["min", "max"]}
      >
        <SliderValue />
      </Slider>
    </div>
  );
}
