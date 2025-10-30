"use client";

import { useState } from "react";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPopup,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from "@/registry/ui/menubar";

export function StatefulMenubar() {
  const [showGrid, setShowGrid] = useState(true);
  const [theme, setTheme] = useState("dark");

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarPopup>
          <MenubarCheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
            Show Grid
          </MenubarCheckboxItem>
          <MenubarCheckboxItem>Show Ruler</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarLabel inset>Theme</MenubarLabel>
            <MenubarRadioGroup value={theme} onValueChange={setTheme}>
              <MenubarRadioItem value="light">Light</MenubarRadioItem>
              <MenubarRadioItem value="dark">Dark</MenubarRadioItem>
              <MenubarRadioItem value="system">System</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarGroup>
        </MenubarPopup>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Account</MenubarTrigger>
        <MenubarPopup>
          <MenubarGroup>
            <MenubarLabel>Signed in as dev@example.com</MenubarLabel>
            <MenubarItem>Settings</MenubarItem>
            <MenubarItem variant="destructive">Sign Out</MenubarItem>
          </MenubarGroup>
        </MenubarPopup>
      </MenubarMenu>
    </Menubar>
  );
}
