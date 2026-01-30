"use client";

import { XIcon } from "lucide-react";
import { Button } from "@/registry/ui/button";
import {
  Dialog,
  DialogClose,
  DialogElementOutsideContent,
  DialogTrigger,
} from "@/registry/ui/dialog";

export function DialogElementsOutsidePopupDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>Open dialog</Button>} />
      <DialogElementOutsideContent className="max-w-280 bg-popover justify-between">
        <DialogClose
          className="absolute right-2 top-2 size-6 sm:size-8 xl:right-4 xl:top-4 xl:size-10 pointer-events-auto"
          render={
            <Button variant="secondary">
              <XIcon />
              <span className="sr-only">Close</span>
            </Button>
          }
        />
        <img
          alt="Placeholder"
          className="w-full flex-1 sm:h-5/6 object-cover rounded-md grayscale opacity-60"
          src="/images/placeholder.svg"
        />
        <div className="text-center p-4 space-y-2">
          <h2 className="text-2xl font-bold">
            Placing elements outside the popup
          </h2>
          <p className="text-muted-foreground">
            Close button is alway on the right corner
          </p>
        </div>
      </DialogElementOutsideContent>
    </Dialog>
  );
}
