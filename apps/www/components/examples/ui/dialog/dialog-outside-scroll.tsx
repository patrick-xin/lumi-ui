"use client";

import { XIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/registry/ui/button";
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
} from "@/registry/ui/dialog";
import {
  ScrollAreaContent,
  ScrollAreaRoot,
  ScrollAreaScrollBar,
  ScrollAreaViewport,
} from "@/registry/ui/scroll-area";

export default function OutsideScrollDialog() {
  const popupRef = React.useRef<HTMLDivElement>(null);

  return (
    <Dialog>
      <DialogTrigger render={<Button>Open dialog</Button>} />
      <DialogPortal>
        <DialogBackdrop />
        <DialogViewport className="group/dialog fixed inset-0 block">
          <ScrollAreaRoot
            style={{ position: undefined }}
            className="h-full overscroll-contain group-data-[ending-style]/dialog:pointer-events-none"
          >
            <ScrollAreaViewport className="h-full overscroll-contain group-data-[ending-style]/dialog:pointer-events-none">
              <ScrollAreaContent className="flex min-h-full items-center justify-center">
                <DialogPopup
                  className="w-full max-w-[calc(100%-2rem)] max-h-full min-h-0 sm:max-w-lg"
                  ref={popupRef}
                  initialFocus={popupRef}
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <DialogTitle>Dialog</DialogTitle>
                    <DialogClose aria-label="Close">
                      <XIcon className="size-4" />
                    </DialogClose>
                  </div>
                  <DialogDescription className="mb-4">
                    This layout keeps an outer container scrollable while the
                    dialog can extend past the bottom edge.
                  </DialogDescription>
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
                </DialogPopup>
              </ScrollAreaContent>
            </ScrollAreaViewport>
            <ScrollAreaScrollBar />
          </ScrollAreaRoot>
        </DialogViewport>
      </DialogPortal>
    </Dialog>
  );
}
