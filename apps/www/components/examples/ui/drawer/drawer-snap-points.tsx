"use client";

import { useState } from "react";
import { Button } from "@/registry/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/ui/drawer";

const SNAP_POINTS = ["18rem", "30rem", 1];

export function DrawerSnapPointsDemo() {
  const [snapPoint, setSnapPoint] = useState<string | number | null>(
    SNAP_POINTS[0],
  );

  return (
    <Drawer
      onSnapPointChange={(next) => setSnapPoint(next)}
      snapPoint={snapPoint}
      snapPoints={SNAP_POINTS}
      snapToSequentialPoints
    >
      <DrawerTrigger render={<Button variant="outline" />}>
        Open Snap Points
      </DrawerTrigger>
      <DrawerContent behavior="snap" showCloseButton>
        <DrawerHeader>
          <DrawerTitle>Incident Timeline</DrawerTitle>
          <DrawerDescription>
            Current snap point: <code>{String(snapPoint)}</code>
          </DrawerDescription>
        </DrawerHeader>

        <div className="space-y-2">
          {Array.from({ length: 24 }).map((_, index) => (
            <div
              className="rounded-md border bg-card p-3 text-card-foreground"
              key={`timeline-${index + 1}`}
            >
              <p className="text-sm font-medium">Event #{index + 1}</p>
              <p className="text-xs text-muted-foreground">
                Synthetic log line for drag, snap, and scroll behavior testing.
              </p>
            </div>
          ))}
        </div>

        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
          <Button>Mark Reviewed</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
