"use client";

import { Button } from "@/registry/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover";

export default function PopoverMatchAnchorWidthDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button className="w-64">Open</Button>} />

      <PopoverContent matchAnchorWidth>
        <div className="text-muted-foreground">
          content inside will have the same width as the trigger
        </div>
      </PopoverContent>
    </Popover>
  );
}
