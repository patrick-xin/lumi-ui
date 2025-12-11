"use client";

import { Button } from "@/registry/ui/button";
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

export default function InsideScrollDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>Open dialog</Button>} />
      <DialogContent className="flex flex-col max-w-2xl">
        <DialogHeader>
          <DialogTitle>Dialog</DialogTitle>
          <DialogDescription>
            This layout keeps the popup fully on screen while allowing its
            content to scroll.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 min-h-0 w-full pr-4">
          <div className="flex flex-col gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                className="flex h-48 w-full shrink-0 items-center justify-center rounded-md bg-accent/30"
                key={String(i)}
              >
                <span className="font-medium text-sm">Item {i + 1}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <DialogClose render={<Button>Close</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
