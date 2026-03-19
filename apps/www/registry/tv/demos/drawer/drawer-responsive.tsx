"use client";

import * as React from "react";
import { useMediaQuery } from "@/registry/hooks/use-media-query";
import { Button } from "@/registry/tv/button";
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
} from "@/registry/tv/drawer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/ui/dialog";
import { ScrollArea } from "@/registry/ui/scroll-area";

export function DrawerDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger render={<Button />}>Open</DialogTrigger>
        <DialogContent className="sm:max-w-3xl" layout="center">
          <DialogHeader>
            <DialogTitle>Dialog</DialogTitle>
            <DialogDescription>
              This is a dialog that turns into a drawer on mobile.
            </DialogDescription>
          </DialogHeader>
          <Content />
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Close</Button>} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerTrigger render={<Button>Open</Button>} />
      <DrawerContent layout="inset">
        <DrawerDragHandle />
        <DrawerHeader>
          <DrawerTitle>Drawer</DrawerTitle>
          <DrawerDescription>
            This is an inset style drawer that turns into a dialog on desktop.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerSelectable className="min-h-0">
          <Content />
        </DrawerSelectable>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline">Close</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const Content = () => {
  return (
    <ScrollArea className="w-full h-[70vh]" gradientScrollFade noScrollBar>
      <div className="flex flex-col gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            className="flex h-48 w-full shrink-0 items-center justify-center rounded-md bg-accent/30"
            key={String(i)}
          >
            <span className="font-medium text-sm">{i + 1}</span>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
