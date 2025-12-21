"use client";

import { Button } from "@/registry/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";

export function MyCustomSelect() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" className="w-64">
            Select a Framework...
          </Button>
        }
      />
      <DropdownMenuContent matchAnchorWidth>
        <DropdownMenuItem>React</DropdownMenuItem>
        <DropdownMenuItem>Vue</DropdownMenuItem>
        <DropdownMenuItem>Svelte</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
