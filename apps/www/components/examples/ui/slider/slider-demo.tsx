import { Slider } from "@/registry/ui/slider";

type SliderProps = React.ComponentProps<typeof Slider>;

export function SliderDemo({ className, ...props }: SliderProps) {
  return (
    <div className="w-72">
      <Slider
        aria-label="slider-demo"
        defaultValue={[50]}
        max={100}
        step={1}
        {...props}
      />
    </div>
  );
}
