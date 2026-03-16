"use client";

import type * as React from "react";
import { Button } from "@/registry/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerDragHandle,
  DrawerHeader,
  DrawerSelectable,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/ui/drawer";
import { ScrollArea } from "@/registry/ui/scroll-area";

const TOP_MARGIN_REM = 4;
const VISIBLE_SNAP_POINTS_REM = [30];

const TOP_MARGIN_REM_SCROLL_AREA = 10;
const VISIBLE_SNAP_POINTS_REM_SCROLL_AREA = [5];

function toViewportSnapPoint(heightRem: number) {
  return `${heightRem + TOP_MARGIN_REM}rem`;
}

function toViewportSnapPointScrollArea(heightRem: number) {
  return `${heightRem + TOP_MARGIN_REM_SCROLL_AREA}rem`;
}

const snapPoints = [...VISIBLE_SNAP_POINTS_REM.map(toViewportSnapPoint), 1];
const snapPointsScrollArea = [
  ...VISIBLE_SNAP_POINTS_REM_SCROLL_AREA.map(toViewportSnapPointScrollArea),
  1,
];

export function DrawerSnapDemo() {
  return (
    <div className="flex gap-4 flex-wrap">
      <Drawer snapPoints={snapPoints}>
        <DrawerTrigger
          render={<Button variant="outline">Open snap drawer</Button>}
        />
        <DrawerContent
          layout="snap"
          style={
            {
              "--drawer-snap-top-margin": `${TOP_MARGIN_REM}rem`,
            } as React.CSSProperties
          }
        >
          <DrawerDragHandle className="my-4" />
          <DrawerHeader className="mb-4 mx-4 touch-none sm:mx-auto w-full max-w-md">
            <DrawerTitle>Snap points</DrawerTitle>
            <DrawerDescription>
              Drag the sheet to snap between a compact peek and a near
              full-height view.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerSelectable className="min-h-0 flex-1 px-4 touch-auto pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] overflow-auto z-10">
            <div className="mx-auto w-full max-w-md">
              <div aria-hidden className="grid gap-3 mb-6">
                {Array.from({ length: 20 }, (_, index) => (
                  <div
                    className="h-12 rounded-xl border bg-accent/30"
                    key={index}
                  />
                ))}
              </div>

              <DrawerClose
                render={
                  <Button className="w-full" variant="outline">
                    Close
                  </Button>
                }
              />
            </div>
          </DrawerSelectable>
        </DrawerContent>
      </Drawer>
      <Drawer snapPoints={snapPointsScrollArea}>
        <DrawerTrigger
          render={
            <Button variant="outline">Open snap drawer with ScrollArea</Button>
          }
        />
        <DrawerContent
          layout="snap"
          style={
            {
              "--drawer-snap-top-margin": `${TOP_MARGIN_REM_SCROLL_AREA}rem`,
            } as React.CSSProperties
          }
        >
          <DrawerDragHandle className="my-4" />

          <ScrollArea
            className="min-h-0 touch-auto pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]"
            gradientScrollFade
            noScrollBar
          >
            <div className="max-w-3xl mx-4 md:mx-auto space-y-6">
              <DrawerHeader>
                <DrawerTitle>Snap points</DrawerTitle>
                <DrawerDescription>
                  Drag the sheet to snap between a compact peek and a near
                  full-height view.
                </DrawerDescription>
              </DrawerHeader>
              <div aria-hidden className="grid gap-3">
                {Array.from({ length: 20 }, (_, index) => (
                  <div
                    className="h-12 rounded-xl border bg-accent/30"
                    key={index}
                  />
                ))}
              </div>

              <DrawerClose
                render={
                  <Button className="w-full" variant="outline">
                    Close
                  </Button>
                }
              />
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
