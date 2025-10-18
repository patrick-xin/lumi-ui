"use client";

import { Button } from "@/registry/ui/button";
import {
  Menu,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
} from "@/registry/ui/menu";

export function MyMenu() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline">Open Menu</Button>} />
      <MenuPopup>
        <MenuGroup>
          <MenuGroupLabel>My Account</MenuGroupLabel>
          <MenuItem>
            <span>Profile</span>
          </MenuItem>
          <MenuItem>
            <span>Settings</span>
          </MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuGroupLabel>Actions</MenuGroupLabel>
          <MenuItem>
            <span>Team</span>
          </MenuItem>
          <MenuItem disabled>
            <span>Invite Users (soon)</span>
          </MenuItem>
          <MenuSeparator />
          <MenuItem variant="destructive">
            <span>Log out</span>
          </MenuItem>
        </MenuGroup>
      </MenuPopup>
    </Menu>
  );
}
