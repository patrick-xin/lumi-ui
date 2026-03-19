"use client";

import { Button } from "@/registry/tv/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerDragHandle,
  DrawerSelectable,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/tv/drawer";

export function DrawerIndentDemo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline">Open drawer</Button>} />
      <DrawerContent>
        <DrawerDragHandle />
        <DrawerSelectable className="max-w-lg">
          <DrawerTitle className="text-center">Notifications</DrawerTitle>
          <DrawerDescription className="text-center">
            You are all caught up. Good job!
          </DrawerDescription>
          <div className="flex justify-center gap-4">
            <DrawerClose render={<Button variant="outline">Close</Button>} />
          </div>
        </DrawerSelectable>
      </DrawerContent>
    </Drawer>
  );
}
