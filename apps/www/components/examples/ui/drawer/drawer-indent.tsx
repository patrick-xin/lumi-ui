"use client";

import { Button } from "@/registry/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerDragHandle,
  DrawerInnerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/ui/drawer";

export function DrawerIndentDemo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline">Open drawer</Button>} />
      <DrawerContent>
        <DrawerDragHandle />
        <DrawerInnerContent className="max-w-lg">
          <DrawerTitle className="text-center">Notifications</DrawerTitle>
          <DrawerDescription className="text-center">
            You are all caught up. Good job!
          </DrawerDescription>
          <div className="flex justify-center gap-4">
            <DrawerClose render={<Button variant="outline">Close</Button>} />
          </div>
        </DrawerInnerContent>
      </DrawerContent>
    </Drawer>
  );
}
