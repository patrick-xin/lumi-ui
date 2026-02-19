"use client";

import { BellIcon } from "lucide-react";
import { cn } from "@/registry/lib/utils";
import { buttonVariants } from "@/registry/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/ui/popover";

export function PopoverOpenOnHoverDemo() {
  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          buttonVariants({ size: "icon-sm", variant: "outline" }),
          "data-popup-open:bg-accent/60",
        )}
        openOnHover
      >
        <BellIcon aria-label="Notifications" />
      </PopoverTrigger>
      <PopoverContent showArrow>
        <PopoverTitle>Notifications</PopoverTitle>
        <PopoverDescription>
          You are all caught up. Good job!
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  );
}
