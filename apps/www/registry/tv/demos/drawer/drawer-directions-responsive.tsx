"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/tv/button";
import {
  createDrawerHandle,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerDragHandle,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/ui/drawer";
import { ScrollArea } from "@/registry/ui/scroll-area";

const drawerHandle = createDrawerHandle<{
  direction: "left" | "right" | "top" | "bottom";
  content?: React.ReactNode;
}>();

const getSwipeDirection = (direction: "left" | "right" | "top" | "bottom") => {
  switch (direction) {
    case "left":
      return "left";
    case "right":
      return "right";
    case "top":
      return "up";
    case "bottom":
      return "down";
  }
};

export function DrawerDirectionsResponsiveDemo() {
  const [direction, setDirection] = useState<
    "left" | "right" | "top" | "bottom"
  >("bottom");

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <DrawerTrigger
          handle={drawerHandle}
          onClick={() => setDirection("bottom")}
          payload={{ direction }}
          render={<Button />}
        >
          Open bottom
        </DrawerTrigger>
        <DrawerTrigger
          handle={drawerHandle}
          onClick={() => setDirection("top")}
          payload={{
            content: <Content className="h-[40vh]" />,
            direction,
          }}
          render={<Button />}
        >
          Open top
        </DrawerTrigger>
        <DrawerTrigger
          handle={drawerHandle}
          onClick={() => setDirection("left")}
          payload={{ direction }}
          render={<Button />}
        >
          Open left
        </DrawerTrigger>
        <DrawerTrigger
          handle={drawerHandle}
          onClick={() => setDirection("right")}
          payload={{
            content: (
              <ScrollArea gradientScrollFade noScrollBar>
                <div className="flex flex-col gap-4 py-4">
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
            ),
            direction,
          }}
          render={<Button />}
        >
          Open right
        </DrawerTrigger>
      </div>
      <Drawer
        handle={drawerHandle}
        swipeDirection={getSwipeDirection(direction)}
      >
        {({ payload: direction }) => (
          <DrawerContent layout="responsive" side={direction?.direction}>
            {direction?.direction === "bottom" && <DrawerDragHandle />}
            <DrawerHeader>
              <DrawerTitle>Drawer</DrawerTitle>
              <DrawerDescription>
                This is a drawer that slides in from the {direction?.direction}.
              </DrawerDescription>
            </DrawerHeader>
            {direction?.content}
            <DrawerFooter>
              <DrawerClose
                render={
                  <Button
                    className={cn(
                      "w-fit mx-auto",
                      (direction?.direction === "left" ||
                        direction?.direction === "right") &&
                        "w-full",
                    )}
                  />
                }
              >
                Close
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        )}
      </Drawer>
    </>
  );
}

const Content = ({ className }: { className?: string }) => {
  return (
    <ScrollArea className={cn(className)} gradientScrollFade noScrollBar>
      <div className="flex flex-col gap-4 py-4">
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
  );
};
