"use client";

import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/registry/ui/button";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@/registry/ui/menu";

export function CloseOnClickMenu() {
  return (
    <Menu>
      <MenuTrigger
        render={
          <Button variant="outline">
            Options <ChevronDownIcon className="size-4" />
          </Button>
        }
      />

      <MenuPopup>
        <MenuItem>Save and Close</MenuItem>
        <MenuItem closeOnClick={false}>Log Action (Keep Open)</MenuItem>
      </MenuPopup>
    </Menu>
  );
}
