"use client";

import { XIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@lumi-ui/ui/button";
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
} from "@lumi-ui/ui/dialog";
import {
  ScrollAreaContent,
  ScrollAreaRoot,
  ScrollAreaScrollBar,
  ScrollAreaViewport,
} from "@lumi-ui/ui/scroll-area";

export function DialogOutsideScrollDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>Open dialog</Button>} />
      <DialogContentWithScrollArea />
    </Dialog>
  );
}

const DialogContentWithScrollArea = () => {
  return (
    <DialogOutsideScrollContent>
      <DialogHeader>
        <DialogTitle>Dialog</DialogTitle>
        <DialogDescription>
          This layout keeps an outer container scrollable while the dialog can
          extend past the bottom edge.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-6 mt-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            className="flex h-48 w-full shrink-0 items-center justify-center rounded-md bg-accent/30"
            key={String(i)}
          >
            <span className="font-medium text-sm">{i + 1}</span>
          </div>
        ))}
      </div>
      <DialogClose
        className="absolute right-2 top-2"
        render={
          <Button size="icon-xs" variant="ghost">
            <XIcon className="size-4" />
          </Button>
        }
      />
    </DialogOutsideScrollContent>
  );
};

const DialogOutsideScrollContent = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPopup>) => {
  const popupRef = React.useRef<HTMLDivElement>(null);
  return (
    <DialogPortal>
      <DialogBackdrop />
      <DialogViewport className="group/dialog">
        <ScrollAreaRoot
          className="h-full overscroll-contain group-data-ending-style/dialog:pointer-events-none"
          style={{ position: undefined }}
        >
          <ScrollAreaViewport className="h-full overscroll-contain group-data-ending-style/dialog:pointer-events-none">
            <ScrollAreaContent className="flex min-h-full items-center justify-center">
              <DialogPopup
                className={cn(
                  "relative mx-auto my-18 p-4 sm:p-6 w-[min(40rem,calc(100vw-2rem))] rounded-lg animate-fade",
                  className,
                )}
                initialFocus={popupRef}
                ref={popupRef}
                {...props}
              >
                {children}
              </DialogPopup>
            </ScrollAreaContent>
          </ScrollAreaViewport>
          <ScrollAreaScrollBar />
        </ScrollAreaRoot>
      </DialogViewport>
    </DialogPortal>
  );
};
