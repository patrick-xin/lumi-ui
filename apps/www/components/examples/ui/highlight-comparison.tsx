"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";

export function HighlightComparison() {
  return (
    <div className="flex gap-20 items-center flex-wrap justify-center">
      <DropdownMenu modal={false} onOpenChange={() => {}} open={true}>
        <DropdownMenuTrigger
          className="w-56"
          render={<Button>Pseudo-element</Button>}
        />
        <DropdownMenuContent>
          <DropdownMenuItem
            className={cn(
              BaseStyle,
              "pl-6",
              "data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-3 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm data-[highlighted]:before:bg-accent data-[highlighted]:text-accent-foreground",
            )}
            onClick={() => alert("Profile item clicked")}
            unstyled
          >
            <span>Profile</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu modal={false} onOpenChange={() => {}} open={true}>
        <DropdownMenuTrigger
          className="w-56"
          render={<Button>Margin or Padding</Button>}
        />
        <DropdownMenuContent
        // Or style parent container
        //className="px-3"
        >
          <DropdownMenuItem
            className={cn(
              BaseStyle,
              "mx-3",
              "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
            )}
            onClick={() => alert("Profile item clicked")}
            unstyled
          >
            <span>Profile</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// UPDATE: Changed px-3.5 (14px) to px-3 (12px)
const BaseStyle = cn(
  "flex items-center gap-2 py-1.5 px-3 text-sm rounded-sm",
  "outline-none select-none cursor-default",
);
