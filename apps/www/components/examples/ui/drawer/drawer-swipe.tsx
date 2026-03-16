"use client";

import { Button } from "@/registry/ui/button";
import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerDescription,
  DrawerPopup,
  DrawerPortal,
  DrawerSelectable,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerViewport,
} from "@/registry/ui/drawer";

export function DrawerSwipeDemo() {
  return (
    <Drawer swipeDirection="right">
      <DrawerSwipeArea className="fixed inset-y-0 right-0 z-10 w-10 border-l-2 border-dashed border-primary/30 bg-primary/5">
        <span className="pointer-events-none absolute right-0 top-1/2 mr-2 -translate-y-1/2 -rotate-90 origin-center whitespace-nowrap text-xs font-semibold tracking-[0.12em] text-primary uppercase">
          Swipe here
        </span>
      </DrawerSwipeArea>
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerViewport
          className="flex items-stretch justify-end"
          data-side="right"
        >
          <DrawerPopup
            className="drawer-popup bg-background text-foreground outline outline-border overflow-y-auto overscroll-contain p-6 pr-[calc(1.2rem+var(--drawer-bleed))] supports-[-webkit-touch-callout:none]:pr-6"
            data-side="right"
          >
            <DrawerSelectable>
              <DrawerTitle>Library</DrawerTitle>
              <DrawerDescription>
                Swipe from the edge whenever you want to jump back into your
                playlists.
              </DrawerDescription>
              <div className="flex justify-end gap-4">
                <DrawerClose
                  render={<Button variant="outline">Close</Button>}
                />
              </div>
            </DrawerSelectable>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  );
}
