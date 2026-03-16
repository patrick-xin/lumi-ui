import { Button } from "@/registry/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerDragHandle,
  DrawerFooter,
  DrawerHeader,
  DrawerSelectable,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/ui/drawer";

export function DrawerSelectionDemo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline">Open drawer</Button>} />
      <DrawerContent>
        <DrawerDragHandle />
        <DrawerSelectable className="max-w-lg">
          <DrawerHeader>
            <DrawerTitle>Drawer Content</DrawerTitle>
            <DrawerDescription>
              You can select content inside the drawer.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose
              render={
                <Button className="w-fit mx-auto" variant="outline">
                  Close
                </Button>
              }
            />
          </DrawerFooter>
        </DrawerSelectable>
      </DrawerContent>
    </Drawer>
  );
}
