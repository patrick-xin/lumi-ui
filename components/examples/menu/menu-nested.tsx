"use client";

import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/registry/ui/button";
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuSubMenu,
  MenuSubMenuPopup,
  MenuSubMenuTrigger,
  MenuTrigger,
} from "@/registry/ui/menu";

export function NestedMenu() {
  return (
    <Menu>
      <MenuTrigger
        render={
          <Button variant="outline">
            Song <ChevronDownIcon className="size-4" />
          </Button>
        }
      />
      <MenuPopup>
        <MenuItem>Add to Library</MenuItem>
        <MenuSubMenu>
          <MenuSubMenuTrigger>Add to Playlist</MenuSubMenuTrigger>
          <MenuSubMenuPopup>
            <MenuItem>Get Up!</MenuItem>
            <MenuItem>Inside Out</MenuItem>
            <MenuItem>Night Beats</MenuItem>
            <MenuSeparator />
            <MenuItem>New playlist…</MenuItem>
          </MenuSubMenuPopup>
        </MenuSubMenu>
        <MenuSeparator />
        <MenuItem>Favorite</MenuItem>
      </MenuPopup>
    </Menu>
  );
}
