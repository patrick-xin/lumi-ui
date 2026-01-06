"use client";

import { Button } from "@/registry/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogScrollArea,
  DialogScrollableContent,
  DialogTitle,
  DialogTrigger,
} from "@/registry/ui/dialog";

export function DialogWithScrollAreaDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>Open dialog</Button>} />
      <DialogScrollableContent>
        <DialogHeader>
          <DialogTitle>Dialog</DialogTitle>
          <DialogDescription>
            This layout keeps the popup fully on screen while allowing its
            content to scroll.
          </DialogDescription>
        </DialogHeader>
        <DialogScrollArea>
          <div className="space-y-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                className="flex h-48 w-full shrink-0 items-center justify-center rounded-md bg-accent/30"
                key={String(i)}
              >
                <span className="font-medium text-sm">{i + 1}</span>
              </div>
            ))}
          </div>
        </DialogScrollArea>
        <DialogFooter>
          <DialogClose render={<Button>Close</Button>} />
        </DialogFooter>
      </DialogScrollableContent>
    </Dialog>
  );
}
