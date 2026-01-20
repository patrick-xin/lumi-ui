"use client";

import { Button } from "@lumi-ui/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@lumi-ui/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";

export function HoverMenu() {
  return (
    // Pass `openOnHover` and `delay` directly to the DropdownMenuTrigger
    <DropdownMenu>
      <DropdownMenuTrigger
        delay={200}
        openOnHover
        render={
          <Button variant="outline">
            Workspace <ChevronDownIcon className="size-4" />
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuItem>Get Up!</DropdownMenuItem>
        <DropdownMenuItem>Inside Out</DropdownMenuItem>
        <DropdownMenuItem>Night Beats</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
