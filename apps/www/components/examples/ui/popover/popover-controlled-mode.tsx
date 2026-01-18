"use client";

import type { PopoverRootChangeEventDetails } from "@base-ui/react";
import { BellIcon } from "lucide-react";
import * as React from "react";
import { Button, buttonVariants } from "@lumi-ui/ui/button";
import {
  createPopoverHandle,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@lumi-ui/ui/popover";

const demoPopover = createPopoverHandle<{ text: string }>();

export function PopoverControlledModeDemo() {
  const [open, setOpen] = React.useState(false);
  const [triggerId, setTriggerId] = React.useState<string | null>(null);

  const handleOpenChange = (
    isOpen: boolean,
    eventDetails: PopoverRootChangeEventDetails,
  ) => {
    setOpen(isOpen);
    setTriggerId(eventDetails.trigger?.id ?? null);
  };

  return (
    <React.Fragment>
      <div className="flex gap-4 flex-wrap justify-center">
        <PopoverTrigger
          className={buttonVariants({ size: "icon-sm", variant: "outline" })}
          handle={demoPopover}
          id="trigger-1"
        >
          <BellIcon aria-label="Notifications" />
        </PopoverTrigger>
        <PopoverTrigger
          className={buttonVariants({ size: "icon-sm", variant: "secondary" })}
          handle={demoPopover}
          id="trigger-2"
        >
          <BellIcon aria-label="Notifications" />
        </PopoverTrigger>
        <PopoverTrigger
          className={buttonVariants({ size: "icon-sm", variant: "outline" })}
          handle={demoPopover}
          id="trigger-3"
        >
          <BellIcon aria-label="Notifications" />
        </PopoverTrigger>
        <Button
          onClick={() => {
            setTriggerId("trigger-2");
            setOpen(true);
          }}
        >
          Open second
        </Button>
      </div>
      <Popover
        handle={demoPopover}
        onOpenChange={handleOpenChange}
        open={open}
        triggerId={triggerId}
      >
        <PopoverContent showArrow>
          <PopoverTitle>Notifications</PopoverTitle>
          <PopoverDescription>
            You are all caught up. Good job!
          </PopoverDescription>
        </PopoverContent>
      </Popover>
    </React.Fragment>
  );
}
