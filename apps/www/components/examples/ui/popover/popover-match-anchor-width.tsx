"use client";

import { Button } from "@lumi-ui/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@lumi-ui/ui/popover";

export function PopoverMatchAnchorWidthDemo() {
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
