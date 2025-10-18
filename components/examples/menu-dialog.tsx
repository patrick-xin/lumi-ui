"use client";

import { ChevronDownIcon, TrashIcon } from "lucide-react";
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
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
} from "@/registry/ui/menu";

export function DialogTriggerMenu() {
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  return (
    <>
      <Menu>
        <MenuTrigger
          render={
            <Button variant="outline">
              Actions <ChevronDownIcon className="size-4" />
            </Button>
          }
        />
        <MenuPopup>
          <MenuItem>Edit</MenuItem>
          <MenuItem>Duplicate</MenuItem>
          <MenuSeparator />
          <MenuItem variant="destructive" onClick={() => setDialogOpen(true)}>
            <TrashIcon className="size-4 mr-2" />
            Delete
          </MenuItem>
        </MenuPopup>
      </Menu>
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogPopup>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              item.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose variant="ghost" onClick={() => setDialogOpen(false)}>
              Cancel
            </DialogClose>
            <DialogClose
              variant="destructive"
              onClick={() => setDialogOpen(false)}
            >
              Delete
            </DialogClose>
          </DialogFooter>
        </DialogPopup>
      </Dialog>
    </>
  );
}
