import { Button } from "@/registry/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip";

export function SimpleTooltip() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant={"outline"}>Hover me</Button>} />
      <TooltipContent side="bottom">
        <p>Hello from tooltip!</p>
      </TooltipContent>
    </Tooltip>
  );
}
