import {
  ContextMenu,
  ContextMenuCheckboxItemContent,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItemContent,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTriggerGroup,
  ContextMenuTrigger,
} from "@/registry/ui/context-menu";

export function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-72">
        <ContextMenuItem>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTriggerGroup>More Tools</ContextMenuSubTriggerGroup>
          <ContextMenuSubContent className="w-44">
            <ContextMenuItem>Save Page...</ContextMenuItem>
            <ContextMenuItem>Create Shortcut...</ContextMenuItem>
            <ContextMenuItem>Name Window...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Developer Tools</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItemContent checked>
          Show Bookmarks
        </ContextMenuCheckboxItemContent>
        <ContextMenuCheckboxItemContent>
          Show Full URLs
        </ContextMenuCheckboxItemContent>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuRadioGroup>
            <ContextMenuLabel inset>People</ContextMenuLabel>
            <ContextMenuRadioItemContent value="pedro">
              Pedro Duarte
            </ContextMenuRadioItemContent>
            <ContextMenuRadioItemContent value="colm">
              Colm Tuite
            </ContextMenuRadioItemContent>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
