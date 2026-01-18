import { cn } from "@/lib/utils";
import { Button } from "@lumi-ui/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@lumi-ui/ui/menubar";

export function MenubarStyleDemo() {
  return (
    <Menubar className="bg-secondary h-12">
      <MenubarMenu>
        <MenubarTrigger
          render={
            <Button
              variant="unstyled"
              className={cn(
                "data-[popup-open]:bg-primary/70! data-[popup-open]:text-primary-foreground",
              )}
            >
              File
            </Button>
          }
        />
        <MenubarContent>
          <MenubarItem>
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger
          render={
            <Button
              variant="unstyled"
              className={cn(
                "data-[popup-open]:bg-primary/70! data-[popup-open]:text-primary-foreground",
              )}
            >
              Edit
            </Button>
          }
        />
        <MenubarContent>
          <MenubarGroup>
            <MenubarItem>Cut</MenubarItem>
            <MenubarItem>Copy</MenubarItem>
            <MenubarItem>Paste</MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
