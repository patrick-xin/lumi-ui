"use client";

import React from "react";
import { Button } from "@/registry/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerSelectable,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/ui/drawer";
import { toast } from "@/registry/ui/toast";

const ACTIONS = [
  "Copy link",
  "Add to Bookmarks",
  "Mute Notifications",
  "Share to...",
  "Report Post",
];

export function DrawerActionSheetDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerTrigger render={<Button>Show options</Button>} />
      <DrawerContent className="pointer-events-none max-w-md outline-0 bg-transparent">
        <DrawerSelectable className="pointer-events-auto overflow-hidden rounded-2xl bg-background overlay-outline">
          <DrawerTitle className="sr-only">Post actions</DrawerTitle>
          <DrawerDescription className="sr-only">
            Choose an action for this post.
          </DrawerDescription>
          <ul
            aria-label="Profile actions"
            className="list-none divide-y divide-border"
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
        </DrawerSelectable>
        <div className="pointer-events-auto overflow-hidden rounded-2xl">
          <Button
            className="w-full h-12 rounded-2xl"
            onClick={() => {
              setOpen(false);

              toast.add({
                description:
                  "The post was successfully removed from your feed.",
                title: "Post removed",
              });
            }}
            variant="destructive"
          >
            Delete Post
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
