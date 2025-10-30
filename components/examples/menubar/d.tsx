"use client";

import type * as React from "react";
import {
  Menubar,
  MenubarItem,
  MenubarMenu,
  MenubarPopup,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSubMenu,
  MenubarSubMenuPopup,
  MenubarSubMenuTrigger,
  MenubarTrigger,
} from "@/registry/ui/menubar";

export default function ExampleMenubar1() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>

        <MenubarPopup>
          <MenubarItem onClick={handleClick} className="w-48">
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onClick={handleClick}>Open</MenubarItem>
          <MenubarItem onClick={handleClick}>Save</MenubarItem>
          <MenubarSubMenu>
            <MenubarSubMenuTrigger>Export</MenubarSubMenuTrigger>
            <MenubarSubMenuPopup>
              <MenubarItem onClick={handleClick}>PDF</MenubarItem>
              <MenubarItem onClick={handleClick}>PNG</MenubarItem>
              <MenubarItem onClick={handleClick}>SVG</MenubarItem>
            </MenubarSubMenuPopup>
          </MenubarSubMenu>

          <MenubarSeparator />
          <MenubarItem onClick={handleClick}>Print</MenubarItem>
        </MenubarPopup>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>

        <MenubarPopup>
          <MenubarItem onClick={handleClick}>Cut</MenubarItem>
          <MenubarItem onClick={handleClick}>Copy</MenubarItem>
          <MenubarItem onClick={handleClick}>Paste</MenubarItem>
        </MenubarPopup>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>

        <MenubarPopup>
          <MenubarItem onClick={handleClick}>Zoom In</MenubarItem>
          <MenubarItem onClick={handleClick}>Zoom Out</MenubarItem>

          <MenubarSubMenu>
            <MenubarSubMenuTrigger>Layout</MenubarSubMenuTrigger>

            <MenubarPopup>
              <MenubarItem onClick={handleClick}>Single Page</MenubarItem>
              <MenubarItem onClick={handleClick}>Two Pages</MenubarItem>
              <MenubarItem onClick={handleClick}>Continuous</MenubarItem>
            </MenubarPopup>
          </MenubarSubMenu>

          <MenubarSeparator />
          <MenubarItem onClick={handleClick}>Full Screen</MenubarItem>
        </MenubarPopup>
      </MenubarMenu>

      <MenubarMenu disabled>
        <MenubarTrigger>Help</MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}

function handleClick(event: React.MouseEvent<HTMLElement>) {
  // eslint-disable-next-line no-console
  console.log(`${event.currentTarget.textContent} clicked`);
}
