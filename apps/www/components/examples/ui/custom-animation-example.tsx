import { Button } from "@/registry/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover";

export const CustomAnimationExample = () => {
  return (
    <Popover>
      <PopoverTrigger
        render={<Button variant="outline">Open popover</Button>}
      />
      <PopoverContent
        matchAnchorWidth
        className="duration-[700ms] ease-[cubic-bezier(0.45,1.005,0,1.005)]"
      >
        hello world
      </PopoverContent>
    </Popover>
  );
};
