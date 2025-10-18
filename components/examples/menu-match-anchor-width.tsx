"use client";

import { Button } from "@/registry/ui/button";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@/registry/ui/menu";

export function MyCustomSelect() {
  return (
    <Menu>
      <MenuTrigger
        render={
          <Button variant="outline" className="w-64">
            Select a Framework...
          </Button>
        }
      />
      <MenuPopup matchAnchorWidth>
        <MenuItem>React</MenuItem>
        <MenuItem>Vue</MenuItem>
        <MenuItem>Svelte</MenuItem>
      </MenuPopup>
    </Menu>
  );
}
