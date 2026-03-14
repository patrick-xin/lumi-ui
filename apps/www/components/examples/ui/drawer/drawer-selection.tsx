import { Button } from "@/registry/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerInnerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/ui/drawer";

export function DrawerSelectionDemo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline">Open drawer</Button>} />
      <DrawerContent>
        <DrawerInnerContent className="mx-auto w-full max-w-lg space-y-4">
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
        </DrawerInnerContent>
      </DrawerContent>
    </Drawer>
  );
}
