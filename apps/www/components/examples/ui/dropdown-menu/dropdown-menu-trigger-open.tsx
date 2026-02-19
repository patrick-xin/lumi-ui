"use client";

import { Button } from "@/registry/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";

export function DropdownMenuTriggerOpen() {
  return (
    <div className="flex flex-col gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={(props, state) => (
            <Button
              className="w-48"
              variant={state.open ? "secondary" : "outline"}
              {...props}
            >
              Actions
            </Button>
          )}
        />
        <DropdownMenuContent matchAnchorWidth>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              className="w-48 data-[popup-open]:bg-accent dark:data-[popup-open]:bg-accent/60 data-[popup-open]:text-accent-foreground"
              variant="outline"
            >
              Actions
            </Button>
          }
        />
        <DropdownMenuContent matchAnchorWidth>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
