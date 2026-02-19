"use client";

import { Button } from "@/registry/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover";

export function PopoverMatchAnchorWidthDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <Popover>
        <PopoverTrigger render={<Button className="w-64">Open</Button>} />
        <PopoverContent matchAnchorWidth>
          <div className="text-muted-foreground text-sm">
            content inside will have the same width as the trigger
          </div>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger render={<Button className="w-64">Open</Button>} />
        <PopoverContent>
          <div className="text-muted-foreground text-sm">
            content inside will not have the same width as the trigger
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
