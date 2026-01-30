"use client";

import type { DialogRootChangeEventDetails } from "@base-ui/react";
import { ChevronLeft, ChevronRight, XIcon } from "lucide-react";
import * as React from "react";
import { ToggleGroupDemo } from "@/components/examples/ui/toggle-group/toggle-group-demo";
import { Button } from "@/registry/ui/button";
import {
  createDialogHandle,
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogPopup,
  DialogPortal,
  DialogTrigger,
  DialogViewport,
} from "@/registry/ui/dialog";

type IImage = {
  alt: string;
  src: string;
  views: number;
  downloads: number;
};

const galleryHandle = createDialogHandle<IImage>();

export function DialogCustomDemo() {
  const [open, setOpen] = React.useState(false);
  const [triggerId, setTriggerId] = React.useState<string | null>(null);

  const handleOpenChange = (
    isOpen: boolean,
    eventDetails: DialogRootChangeEventDetails,
  ) => {
    setOpen(isOpen);
    setTriggerId(eventDetails.trigger?.id ?? null);
  };
  const navigate = React.useCallback(
    (direction: "next" | "prev") => {
      if (!triggerId) return;
      const currentIndex = parseInt(triggerId.replace("trigger-", ""), 10);
      if (isNaN(currentIndex)) return;

      let nextIndex = 0;
      if (direction === "next") {
        nextIndex = (currentIndex + 1) % IMAGES.length;
      } else {
        nextIndex = (currentIndex - 1 + IMAGES.length) % IMAGES.length;
      }

      setTriggerId(`trigger-${nextIndex}`);
    },
    [triggerId],
  );

  return (
    <>
      <div className="grid grid-cols-3 gap-4 max-w-4xl">
        {IMAGES.map((img, i) => (
          <DialogTrigger
            handle={galleryHandle}
            id={`trigger-${i}`}
            key={img.alt}
            payload={img}
            render={
              <button
                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                type="button"
              >
                <img
                  alt={img.alt}
                  className="h-full w-full object-cover"
                  src={img.src}
                />
              </button>
            }
          />
        ))}
      </div>

      <Dialog
        handle={galleryHandle}
        onOpenChange={handleOpenChange}
        open={open}
        triggerId={triggerId}
      >
        {({ payload }) => (
          <DialogPortal>
            <DialogBackdrop />
            <DialogViewport className="grid place-items-center overflow-y-auto">
              <DialogPopup className="flex h-full w-full justify-center pointer-events-none bg-transparent outline-0 animate-fade pt-12 sm:px-12">
                <div className="pointer-events-auto h-full w-full flex flex-col shadow-md bg-background sm:max-w-[calc(100vw-12rem)] rounded-2xl">
                  <DialogClose
                    className="fixed left-2 top-2 rounded-full"
                    render={
                      <Button
                        className="size-8 rounded-full text-white/70 hover:bg-white/20 hover:text-white"
                        size="icon"
                        variant="ghost"
                      >
                        <XIcon className="size-6" />
                        <span className="sr-only">Close</span>
                      </Button>
                    }
                  />
                  <DialogClose
                    className="absolute -top-12 right-0 md:hidden"
                    render={
                      <Button
                        className="rounded-full text-white/70 hover:bg-white/20 hover:text-white"
                        size="icon"
                        variant="ghost"
                      >
                        <XIcon className="size-6" />
                        <span className="sr-only">Close</span>
                      </Button>
                    }
                  />
                  <Button
                    className="fixed hidden md:flex left-4 top-1/2 -translate-y-1/2 rounded-full text-white/70 hover:bg-white/20 hover:text-white md:left-8 md:size-12"
                    onClick={() => navigate("prev")}
                    size="icon"
                    variant="ghost"
                  >
                    <ChevronLeft className="size-8" />
                    <span className="sr-only">Previous image</span>
                  </Button>

                  <Button
                    className="fixed hidden md:flex right-4 top-1/2 -translate-y-1/2 rounded-full text-white/70 hover:bg-white/20 hover:text-white md:right-8 md:size-12"
                    onClick={() => navigate("next")}
                    size="icon"
                    variant="ghost"
                  >
                    <ChevronRight className="size-8" />
                    <span className="sr-only">Next image</span>
                  </Button>
                  <div className="relative grid grid-rows-[auto_1fr_auto] h-[calc(100vh-3rem)]">
                    <div className="flex justify-end px-4 py-2">
                      <ToggleGroupDemo />
                    </div>

                    <div className="flex flex-col max-w-4xl mx-auto items-center justify-center flex-1 w-full">
                      <img
                        alt={payload?.alt}
                        className="h-full w-full h-[70vh] rounded-md object-contain"
                        key={payload?.src}
                        src={payload?.src}
                      />
                    </div>

                    <div className="flex gap-8 p-4 text-sm">
                      <div className="flex flex-col gap-2">
                        <div className="text-muted-foreground font-semibold">
                          Views
                        </div>
                        <div>{payload?.views}</div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="text-muted-foreground font-semibold">
                          Downloads
                        </div>
                        <div>{payload?.downloads}</div>
                      </div>
                    </div>
                  </div>
                  <div className="max-w-7xl flex-1 w-full mx-auto space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-screen pt-6">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        className="flex h-64 w-full shrink-0 items-center justify-center rounded-md bg-muted"
                        key={String(i)}
                      />
                    ))}
                  </div>
                </div>
              </DialogPopup>
            </DialogViewport>
          </DialogPortal>
        )}
      </Dialog>
    </>
  );
}

const IMAGES: IImage[] = [
  {
    alt: "Abstract colorful waves",
    downloads: 3578,
    src: "https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?q=80&w=1000&auto=format&fit=crop",
    views: 5726,
  },
  {
    alt: "People watching illuminated japanese lanterns",
    downloads: 373,
    src: "https://images.unsplash.com/photo-1765614244329-22ca4157345a?q=80&w=1000&auto=format&fit=crop",
    views: 1253,
  },
  {
    alt: "Abstract oil painting",
    downloads: 2354,
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    views: 7676,
  },
];
