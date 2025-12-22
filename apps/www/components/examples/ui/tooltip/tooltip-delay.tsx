import { Button } from "@/registry/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/ui/tooltip";

export function TooltipDelayDemo() {
  return (
    <TooltipProvider delay={0}>
      <Tooltip>
        <TooltipTrigger
          render={<Button variant={"outline"}>Hover me</Button>}
        />
        <TooltipContent>
          <p>Hello from tooltip!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
