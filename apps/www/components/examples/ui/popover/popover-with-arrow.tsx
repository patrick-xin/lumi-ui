"use client";

import { BellIcon } from "lucide-react";
import { Button } from "@/registry/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/ui/popover";

export function PopoverWithArrowDemo() {
  return (
    <Popover defaultOpen>
      <PopoverTrigger render={<Button size="icon" variant="outline" />}>
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
