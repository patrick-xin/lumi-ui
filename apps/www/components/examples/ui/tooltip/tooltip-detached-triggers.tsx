"use client";

import { InfoIcon } from "lucide-react";
import { Button } from "@lumi-ui/ui/button";
import {
  createTooltipHandle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@lumi-ui/ui/tooltip";

const demoTooltip = createTooltipHandle();

export function TooltipDetachedTriggersDemo() {
  return (
    <TooltipProvider>
      <TooltipTrigger
        handle={demoTooltip}
        render={
          <Button variant={"outline"} size="icon">
            <InfoIcon className="size-5" />
          </Button>
        }
      />
      <Tooltip handle={demoTooltip}>
        <TooltipContent>This is a detached tooltip</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
