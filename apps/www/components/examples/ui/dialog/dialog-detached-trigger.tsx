"use client";

import * as React from "react";
import { Button } from "@/registry/ui/button";
import {
  createDialogHandle,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/ui/dialog";

const demoDialogHandle = createDialogHandle();

export function DialogDetachedTriggersSimpleDemo() {
  return (
    <React.Fragment>
      <DialogTrigger
        handle={demoDialogHandle}
        render={<Button>View notifications</Button>}
      />
      <Dialog handle={demoDialogHandle}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
            <DialogDescription>
              You are all caught up. Good job!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Close</Button>} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
