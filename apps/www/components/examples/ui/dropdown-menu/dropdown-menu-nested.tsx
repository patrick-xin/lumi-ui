"use client";

import { Button } from "@lumi-ui/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSubMenu,
  DropdownMenuSubMenuContent,
  DropdownMenuSubMenuTriggerGroup,
  DropdownMenuTrigger,
} from "@lumi-ui/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";

export function NestedMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button className="w-60 justify-between" variant="outline">
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
