import { Slider } from "@/registry/ui/slider";

export function EdgeAlignedSliderDemo() {
  return (
    <div className="w-56 p-6">
      {/* 
        "edge" alignment prevents the thumb from overflowing 
        the container at 0% or 100%.
      */}
      <Slider defaultValue={[50]} max={100} thumbAlignment="edge" />
    </div>
  );
}
