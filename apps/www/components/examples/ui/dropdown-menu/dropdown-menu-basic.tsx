"use client";

import { Button } from "@lumi-ui/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@lumi-ui/ui/dropdown-menu";

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="w-56"
        render={<Button>Open Menu</Button>}
      />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuGroupLabel>My Account</DropdownMenuGroupLabel>
          <DropdownMenuItem>
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuGroupLabel>Actions</DropdownMenuGroupLabel>
          <DropdownMenuItem>
            <span>Team</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <span>Invite Users (soon)</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
