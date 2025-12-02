import { Slider } from "@/registry/ui/slider";

export function RangeSliderDemo() {
  return (
    <div className="w-56 p-6">
      {/* 
        The component detects the array length (2) 
        and automatically renders 2 thumbs.
      */}
      <Slider defaultValue={[25, 45]} max={100} step={1} />
    </div>
  );
}
