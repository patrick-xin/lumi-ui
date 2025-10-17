"use client";

import * as React from "react";

import { Button } from "@/registry/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
} from "@/registry/ui/dialog";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "@/registry/ui/menu";

export function DialogFromMenuDemo() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  return (
    <>
      <Menu>
        <MenuTrigger render={<Button variant="outline" />}>
          Open menu
        </MenuTrigger>
        <MenuContent>
          <MenuItem onClick={() => setDialogOpen(true)}>Open dialog</MenuItem>
        </MenuContent>
      </Menu>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogPopup>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>Change your preferences</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>Close</DialogClose>
          </DialogFooter>
        </DialogPopup>
      </Dialog>
    </>
  );
}
