import { Button } from "@/registry/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover";

export const CustomAnimationExampleFast = () => {
  return (
    <div>
      <Popover>
        <PopoverTrigger
          render={<Button variant="outline">disable ending transition</Button>}
        />
        <PopoverContent
          matchAnchorWidth
          className="data-[ending-style]:transition-none"
        >
          hello world
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger render={<Button variant="outline">Normal</Button>} />
        <PopoverContent matchAnchorWidth>hello world</PopoverContent>
      </Popover>
    </div>
  );
};
