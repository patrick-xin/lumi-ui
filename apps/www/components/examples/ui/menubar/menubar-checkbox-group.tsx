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
  MenubarTrigger,
} from "@/registry/ui/menubar";

export function MenubarWithCheckboxAndRadioGroupDemo() {
  return (
    <Menubar>
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
