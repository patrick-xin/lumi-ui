"use client";

import { Button } from "@/registry/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogScrollArea,
  DialogTitle,
  DialogTrigger,
} from "@/registry/ui/dialog";

export default function InsideScrollDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>Open dialog</Button>} />
      <DialogContent className="flex flex-col max-w-3xl!">
        <DialogHeader>
          <DialogTitle>Dialog</DialogTitle>
          <DialogDescription>
            This layout keeps the popup fully on screen while allowing its
            content to scroll.
          </DialogDescription>
        </DialogHeader>
        <DialogScrollArea>
          <div className="flex flex-col gap-6">
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
      </DialogContent>
    </Dialog>
  );
}
