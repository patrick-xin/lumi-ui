"use client";

import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/registry/ui/button";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@/registry/ui/menu";

export function HoverMenu() {
  return (
    // Pass `openOnHover` and `delay` directly to the Menu
    <Menu openOnHover delay={200}>
      <MenuTrigger
        render={
          <Button variant="outline">
            Workspace <ChevronDownIcon className="size-4" />
          </Button>
        }
      />
      <MenuPopup matchAnchorWidth>
        <MenuItem>Get Up!</MenuItem>
        <MenuItem>Inside Out</MenuItem>
        <MenuItem>Night Beats</MenuItem>
      </MenuPopup>
    </Menu>
  );
}
