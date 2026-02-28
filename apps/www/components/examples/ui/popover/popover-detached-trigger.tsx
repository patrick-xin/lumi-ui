"use client";

import { BellIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/registry/lib/utils";
import { buttonVariants } from "@/registry/ui/button";
import {
  createPopoverHandle,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/ui/popover";

const demoPopover = createPopoverHandle();

export default function PopoverDetachedTriggerDemo() {
  return (
    <React.Fragment>
      <PopoverTrigger
        className={cn(buttonVariants({ size: "icon-sm", variant: "outline" }))}
        handle={demoPopover}
      >
        <BellIcon />
      </PopoverTrigger>
      <Popover handle={demoPopover}>
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
