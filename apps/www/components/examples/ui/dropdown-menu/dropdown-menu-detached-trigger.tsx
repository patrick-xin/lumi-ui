"use client";

import * as React from "react";
import {
  createDropdownMenuHandle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";
import { Button } from "../../../../registry/ui/button";

const demoMenu = createDropdownMenuHandle();

export function DropdownMenuDetachedTriggerDemo() {
  return (
    <React.Fragment>
      <DropdownMenuTrigger
        handle={demoMenu}
        aria-label="Project actions"
        render={<Button>Actions</Button>}
      />
      <DropdownMenu handle={demoMenu}>
        <DropdownMenuContent matchAnchorWidth={false}>
          <DropdownMenuItem>Rename</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuItem>Move to folder</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Archive</DropdownMenuItem>
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </React.Fragment>
  );
}
