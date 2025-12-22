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
        <DialogBackdrop className="transition-[backdrop-filter,opacity] duration-[600ms] ease-[var(--ease-out-fast)] backdrop-blur-[1.5px] data-[starting-style]:backdrop-blur-0 data-[starting-style]:opacity-0 data-[ending-style]:backdrop-blur-0 data-[ending-style]:opacity-0 data-[ending-style]:duration-[350ms] data-[ending-style]:ease-[cubic-bezier(0.375,0.015,0.545,0.455)] dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
        <DialogViewport className="group/dialog fixed inset-0">
          <ScrollAreaRoot
            style={{ position: undefined }}
            className="h-full overscroll-contain group-data-[ending-style]/dialog:pointer-events-none"
          >
            <ScrollAreaViewport className="h-full overscroll-contain group-data-[ending-style]/dialog:pointer-events-none">
              <ScrollAreaContent className="flex min-h-full items-center justify-center">
                <DialogPopup
                  animation="none"
                  className="relative mx-auto my-18 w-[min(40rem,calc(100vw-2rem))] rounded-lg transition-transform duration-[700ms] ease-[cubic-bezier(0.45,1.005,0,1.005)] data-[starting-style]:translate-y-[100dvh] data-[ending-style]:translate-y-[max(100dvh,100%)] data-[ending-style]:duration-[350ms] data-[ending-style]:ease-[cubic-bezier(0.375,0.015,0.545,0.455)] motion-reduce:transition-none"
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
