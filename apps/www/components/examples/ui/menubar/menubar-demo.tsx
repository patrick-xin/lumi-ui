import {
  Menubar,
  MenubarCheckboxItemContent,
  MenubarContent,
  MenubarGroup,
  MenubarGroupLabel,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItemContent,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSubMenu,
  MenubarSubMenuContent,
  MenubarSubMenuTrigger,
  MenubarTrigger,
} from "@lumi-ui/ui/menubar";

export function MenubarDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              New Window <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>New Incognito Window</MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarSubMenu>
            <MenubarSubMenuTrigger>Share</MenubarSubMenuTrigger>
            <MenubarSubMenuContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubMenuContent>
          </MenubarSubMenu>
          <MenubarSeparator />
          <MenubarItem>
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarItem>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarSubMenu>
            <MenubarSubMenuTrigger>Find</MenubarSubMenuTrigger>
            <MenubarSubMenuContent>
              <MenubarItem>Search the web</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Find...</MenubarItem>
              <MenubarItem>Find Next</MenubarItem>
              <MenubarItem>Find Previous</MenubarItem>
            </MenubarSubMenuContent>
          </MenubarSubMenu>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem>Cut</MenubarItem>
            <MenubarItem>Copy</MenubarItem>
            <MenubarItem>Paste</MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItemContent>
            Always Show Bookmarks Bar
          </MenubarCheckboxItemContent>
          <MenubarCheckboxItemContent checked>
            Always Show Full URLs
          </MenubarCheckboxItemContent>
          <MenubarSeparator />
          <MenubarItem>
            Reload <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>
            Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Toggle Fullscreen</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Hide Sidebar</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Profiles</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarGroupLabel>Switch Profile</MenubarGroupLabel>
            <MenubarRadioGroup>
              <MenubarRadioItemContent value="andy">
                Andy
              </MenubarRadioItemContent>
              <MenubarRadioItemContent value="benoit">
                Benoit
              </MenubarRadioItemContent>
              <MenubarRadioItemContent value="Luis">
                Luis
              </MenubarRadioItemContent>
            </MenubarRadioGroup>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarItem>Edit...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Add Profile...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu disabled>
        <MenubarTrigger>Help</MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}
