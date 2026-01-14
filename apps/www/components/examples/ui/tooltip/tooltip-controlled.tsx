"use client";

import type { TooltipRootChangeEventDetails } from "@base-ui/react";
import { InfoIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";
import {
  createTooltipHandle,
  Tooltip,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/ui/tooltip";

const demoTooltip = createTooltipHandle();

export default function TooltipControlledDemo() {
  const [open, setOpen] = React.useState(false);
  const [triggerId, setTriggerId] = React.useState<string | null>(null);

  const handleOpenChange = (
    isOpen: boolean,
    eventDetails: TooltipRootChangeEventDetails,
  ) => {
    setOpen(isOpen);
    setTriggerId(eventDetails.trigger?.id ?? null);
  };

  return (
    <TooltipProvider>
      <div className="flex gap-2 flex-wrap justify-center">
        <div className="flex gap-2">
          <TooltipTrigger
            handle={demoTooltip}
            id="trigger-1"
            render={
              <Button size="icon" variant="outline">
                <InfoIcon aria-label="Information 1" className="size-5" />
              </Button>
            }
          />
          <TooltipTrigger
            handle={demoTooltip}
            id="trigger-2"
            render={
              <Button size="icon" variant="outline">
                <InfoIcon aria-label="Information 2" className="size-5" />
              </Button>
            }
          />
          <TooltipTrigger
            handle={demoTooltip}
            id="trigger-3"
            render={
              <Button size="icon" variant="outline">
                <InfoIcon aria-label="Information 3" className="size-5" />
              </Button>
            }
          />
        </div>
        <Button
          onClick={() => {
            setTriggerId("trigger-2");
            setOpen(true);
          }}
        >
          Open second
        </Button>
      </div>
      <Tooltip
        handle={demoTooltip}
        onOpenChange={handleOpenChange}
        open={open}
        triggerId={triggerId}
      >
        <TooltipPortal>
          <TooltipPositioner sideOffset={10}>
            <TooltipPopup
              className={cn(
                "bg-popover text-popover-foreground w-fit rounded-md px-3 py-1.5 text-xs text-balance animate-popup data-instant:transition-none",
              )}
            >
              hello from tooltip
            </TooltipPopup>
          </TooltipPositioner>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  );
}
