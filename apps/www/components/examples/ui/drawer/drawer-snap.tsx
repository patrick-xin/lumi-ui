"use client";

import type * as React from "react";
import { Button } from "@/registry/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerDragHandle,
  DrawerHeader,
  DrawerSelectable,
  DrawerTitle,
  DrawerTrigger,
  SnapDrawerContent,
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
        <SnapDrawerContent
          className="bg-transparent outline-none"
          layout="inset"
          style={
            {
              "--drawer-snap-top-margin": `${TOP_MARGIN_REM}rem`,
            } as React.CSSProperties
          }
        >
          <div className="rounded-t-lg flex justify-center border border-b-0 flex-col w-full bg-background">
            <DrawerDragHandle className="my-2" />
            <DrawerHeader className="mb-4 mx-4 touch-none sm:mx-auto w-full max-w-md">
              <DrawerTitle>Snap points</DrawerTitle>
              <DrawerDescription className="text-pretty">
                Drag the sheet to snap between a compact peek and a near
                full-height view.
              </DrawerDescription>
            </DrawerHeader>
          </div>
          <DrawerSelectable className="min-h-0 flex-1 px-4 touch-auto pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] overflow-auto z-10 bg-background border border-t-0 rounded-lg rounded-t-none">
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
        </SnapDrawerContent>
      </Drawer>
      <Drawer snapPoints={snapPointsScrollArea}>
        <DrawerTrigger
          render={
            <Button variant="outline">Open snap drawer with ScrollArea</Button>
          }
        />
        <SnapDrawerContent
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
        </SnapDrawerContent>
      </Drawer>
    </div>
  );
}
