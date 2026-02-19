"use client";

import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/registry/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSubMenu,
  DropdownMenuSubMenuContent,
  DropdownMenuSubMenuTriggerGroup,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";

export function NestedMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            className="w-60 justify-between data-popup-open:bg-accent/60"
            variant="outline"
          >
            Song <ChevronDownIcon />
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuItem>Add to Library</DropdownMenuItem>
        <DropdownMenuSubMenu>
          <DropdownMenuSubMenuTriggerGroup>
            Add to Playlist
          </DropdownMenuSubMenuTriggerGroup>
          <DropdownMenuSubMenuContent>
            <DropdownMenuItem>Get Up!</DropdownMenuItem>
            <DropdownMenuItem>Inside Out</DropdownMenuItem>
            <DropdownMenuItem>Night Beats</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>New playlist…</DropdownMenuItem>
          </DropdownMenuSubMenuContent>
        </DropdownMenuSubMenu>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Favorite</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
