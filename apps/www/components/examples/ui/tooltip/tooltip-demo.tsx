"use client";

import { Button } from "@/registry/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip";

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
