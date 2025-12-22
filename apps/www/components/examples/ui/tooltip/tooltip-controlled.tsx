"use client";

import type { TooltipRootChangeEventDetails } from "@base-ui/react";
import { InfoIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/registry/ui/button";
import {
  createTooltipHandle,
  Tooltip,
  TooltipArrow,
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
            render={
              <Button variant="outline" size="icon">
                <InfoIcon aria-label="Information 1" className="size-5" />
              </Button>
            }
            handle={demoTooltip}
            id="trigger-1"
          />
          <TooltipTrigger
            render={
              <Button variant="outline" size="icon">
                <InfoIcon aria-label="Information 2" className="size-5" />
              </Button>
            }
            handle={demoTooltip}
            id="trigger-2"
          />
          <TooltipTrigger
            render={
              <Button variant="outline" size="icon">
                <InfoIcon aria-label="Information 3" className="size-5" />
              </Button>
            }
            handle={demoTooltip}
            id="trigger-3"
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
        open={open}
        onOpenChange={handleOpenChange}
        triggerId={triggerId}
      >
        <TooltipPortal>
          <TooltipPositioner
            className="
              h-(--positioner-height)
              w-(--positioner-width)
              max-w-(--available-width)
            "
            sideOffset={10}
          >
            <TooltipPopup
              className="
                px-2 py-1 bg-foreground text-background
                rounded-md
                text-sm
                origin-(--transform-origin)
                transition-[transform,scale,opacity]
                data-ending-style:opacity-0 data-ending-style:scale-90
                data-instant:transition-none
                data-starting-style:opacity-0 data-starting-style:scale-90"
            >
              <TooltipArrow />
              Controlled tooltip
            </TooltipPopup>
          </TooltipPositioner>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  );
}
