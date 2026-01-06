"use client";

import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogPopup,
  DialogPortal,
  DialogTrigger,
  DialogViewport,
} from "@/registry/ui/dialog";

export function DialogOutsidePopupDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>Open dialog</Button>} />
      <DialogOutsideContent className="rounded bg-popover animate-dialog max-w-[60rem]">
        <p className="font-bold text-lg">Close button is outside</p>
      </DialogOutsideContent>
    </Dialog>
  );
}

const DialogOutsideContent = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPopup>) => {
  return (
    <DialogPortal>
      <DialogBackdrop className="bg-black/70 animate-backdrop" />
      <DialogViewport className="grid place-items-center px-4 py-10 xl:py-6">
        <DialogPopup
          className="flex h-full w-full justify-center pointer-events-none transition-opacity duration-150 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 p-0! bg-transparent"
          {...props}
        >
          <DialogClose
            className="absolute right-3 top-2 xl:right-3 xl:top-3 xl:size-6 pointer-events-auto"
            render={
              <Button aria-label="Close" size="icon-xs" variant="outline">
                <XIcon />
              </Button>
            }
          />
          <div
            className={cn(
              "pointer-events-auto h-full w-full flex justify-center items-center",
              className,
            )}
          >
            {children}
          </div>
        </DialogPopup>
      </DialogViewport>
    </DialogPortal>
  );
};
