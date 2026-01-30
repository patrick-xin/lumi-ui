import { Button } from "@/registry/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover";

export const CustomAnimationExample = () => {
  return (
    <div className="flex gap-6 flex-wrap">
      <Popover>
        <PopoverTrigger render={<Button variant="outline">Normal</Button>} />
        <PopoverContent matchAnchorWidth>hello world</PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger
          render={<Button variant="outline">Slow animation</Button>}
        />
        <PopoverContent
          className="duration-[700ms] ease-[cubic-bezier(0.45,1.005,0,1.005)]"
          matchAnchorWidth
        >
          hello world
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger
          render={<Button variant="outline">disable ending transition</Button>}
        />
        <PopoverContent
          className="data-[ending-style]:transition-none"
          matchAnchorWidth
        >
          hello world
        </PopoverContent>
      </Popover>
    </div>
  );
};
