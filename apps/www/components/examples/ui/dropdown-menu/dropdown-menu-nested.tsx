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
  DropdownMenuSubMenuTrigger,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";

export function NestedMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" className="w-60 justify-between">
            Song <ChevronDownIcon />
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuItem>Add to Library</DropdownMenuItem>
        <DropdownMenuSubMenu>
          <DropdownMenuSubMenuTrigger>
            Add to Playlist
          </DropdownMenuSubMenuTrigger>
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
