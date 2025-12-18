"use client";

import { BellIcon } from "lucide-react";
import { buttonVariants } from "@/registry/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/ui/popover";

export default function PopoverWithArrowDemo() {
  return (
    <Popover>
      <PopoverTrigger
        className={buttonVariants({ variant: "outline", size: "icon-sm" })}
      >
        <BellIcon />
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
