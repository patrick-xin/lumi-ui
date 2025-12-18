"use client";

import type { PopoverRootChangeEventDetails } from "@base-ui/react";
import { BellIcon } from "lucide-react";
import * as React from "react";
import { Button, buttonVariants } from "@/registry/ui/button";
import {
  createPopoverHandle,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/ui/popover";

const demoPopover = createPopoverHandle<{ text: string }>();

export default function PopoverControlledModeDemo() {
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
          className={buttonVariants({ variant: "outline", size: "icon-sm" })}
          handle={demoPopover}
          id="trigger-1"
        >
          <BellIcon aria-label="Notifications" />
        </PopoverTrigger>
        <PopoverTrigger
          className={buttonVariants({ variant: "secondary", size: "icon-sm" })}
          handle={demoPopover}
          id="trigger-2"
        >
          <BellIcon aria-label="Notifications" />
        </PopoverTrigger>
        <PopoverTrigger
          className={buttonVariants({ variant: "outline", size: "icon-sm" })}
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
        open={open}
        onOpenChange={handleOpenChange}
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
