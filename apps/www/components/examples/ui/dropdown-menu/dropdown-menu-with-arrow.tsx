"use client";

import { Button } from "@lumi-ui/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@lumi-ui/ui/dropdown-menu";

export function DropdownMenuWithArrow() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button className="w-48" variant="outline">
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
