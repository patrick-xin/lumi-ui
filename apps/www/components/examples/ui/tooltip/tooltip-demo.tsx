"use client";

import { Button } from "@lumi-ui/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@lumi-ui/ui/tooltip";

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant={"outline"}>Hover me</Button>} />
      <TooltipContent>
        <p>Hello from tooltip!</p>
      </TooltipContent>
    </Tooltip>
  );
}
