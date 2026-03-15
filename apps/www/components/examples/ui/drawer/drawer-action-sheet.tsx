"use client";

import React from "react";
import { Button } from "@/registry/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerInnerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/ui/drawer";
import { toast } from "@/registry/ui/toast";

const ACTIONS = [
  "Unfollow",
  "Mute",
  "Add to Favourites",
  "Add to Close Friends",
  "Restrict",
];

export function DrawerActionSheetDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerTrigger
        render={<Button variant="outline">Open Action Sheet</Button>}
      />
      <DrawerContent className="pointer-events-none max-w-md bg-transparent outline-0">
        <DrawerInnerContent className="pointer-events-auto overflow-hidden rounded-2xl bg-background overlay-outline">
          <DrawerTitle className="sr-only">Profile actions</DrawerTitle>
          <DrawerDescription className="sr-only">
            Choose an action for this user.
          </DrawerDescription>
          <ul
            aria-label="Profile actions"
            className="m-0 list-none divide-y divide-border p-0"
          >
            {ACTIONS.map((action, index) => (
              <li key={action}>
                {index === 0 && (
                  <DrawerClose className="sr-only">
                    Close action sheet
                  </DrawerClose>
                )}
                <Button
                  className="w-full h-12 rounded-none"
                  onClick={() => setOpen(false)}
                  variant="ghost"
                >
                  {action}
                </Button>
              </li>
            ))}
          </ul>
        </DrawerInnerContent>
        <div className="pointer-events-auto overflow-hidden rounded-2xl">
          <Button
            className="w-full h-12 rounded-2xl"
            onClick={() => {
              setOpen(false);

              toast.add({
                description: "You will no longer see posts from this user.",
                title: "User blocked",
              });
            }}
            variant="destructive"
          >
            Block User
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
