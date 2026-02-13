"use client";

import { Button } from "@/registry/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/ui/drawer";

const quickActions = [
  {
    description: "Create a temporary share link with read-only permissions.",
    title: "Share Link",
  },
  {
    description: "Copy settings to a different project in this workspace.",
    title: "Duplicate Config",
  },
  {
    description: "Generate a one-time snapshot for rollback testing.",
    title: "Create Snapshot",
  },
];

export function DrawerActionSheetDemo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>
        Open Action Sheet
      </DrawerTrigger>

      <DrawerContent
        align="centered"
        className="bg-transparent border-none shadow-none px-4 pt-2 "
      >
        <div className="rounded-2xl border bg-card p-4 text-card-foreground shadow-sm">
          <DrawerTitle>Project Actions</DrawerTitle>
          <DrawerDescription>Choose an action to continue.</DrawerDescription>
          <div className="mt-3 space-y-2">
            {quickActions.map((action) => (
              <Button
                className="w-full justify-start"
                key={action.title}
                variant="outline"
              >
                <p className="text-sm font-medium">{action.title}</p>
                <p className="text-xs text-muted-foreground">
                  {action.description}
                </p>
              </Button>
            ))}
          </div>
          <div className="mt-3">
            <DrawerClose
              render={<Button className="w-full" variant="outline" />}
            >
              Cancel
            </DrawerClose>
          </div>
        </div>

        <div className="rounded-2xl border border-destructive/40 bg-destructive/5 p-3">
          <DrawerClose
            render={<Button className="w-full" variant="destructive" />}
          >
            Delete Project
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
