"use client";

import { Button } from "@/registry/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";

export function DropdownMenuWithArrow() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            className="w-48 data-popup-open:bg-accent/60"
            variant="outline"
          >
            Actions
          </Button>
        }
      />
      <DropdownMenuContent showArrow>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
