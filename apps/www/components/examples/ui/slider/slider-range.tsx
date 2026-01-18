import { Slider, SliderValue } from "@lumi-ui/ui/slider";

export function RangeSliderDemo() {
  return (
    <div className="w-56 p-6">
      <Slider
        aria-label="range-slider-demo"
        defaultValue={[25, 45]}
        max={100}
        step={1}
      >
        <SliderValue />
      </Slider>
    </div>
  );
}
