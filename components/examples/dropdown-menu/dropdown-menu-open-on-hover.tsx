"use client";

import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/registry/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";

export function HoverMenu() {
  return (
    // Pass `openOnHover` and `delay` directly to the Menu
    <DropdownMenu openOnHover delay={200}>
      <DropdownMenuTrigger
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
