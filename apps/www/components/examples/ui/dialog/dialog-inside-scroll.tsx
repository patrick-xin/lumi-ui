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

export function DialogInsideScrollDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <Dialog>
        <DialogTrigger render={<Button>With header footer</Button>} />
        <DialogContent layout="scrollable">
          <DialogHeader>
            <DialogTitle>Dialog</DialogTitle>
            <DialogDescription>
              This layout keeps the popup fully on screen while allowing its
              content to scroll with fixed header and footer.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="pr-4">
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
          </ScrollArea>
          <DialogFooter>
            <DialogClose render={<Button>Close</Button>} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger
          render={<Button variant="outline">Without header footer</Button>}
        />
        <DialogContent className="sm:p-2" layout="scrollable">
          <div className="overflow-y-auto px-4">
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
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
