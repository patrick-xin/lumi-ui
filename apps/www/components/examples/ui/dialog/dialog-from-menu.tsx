"use client";

import * as React from "react";
import { Button } from "@/registry/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/registry/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";

export function DialogFromMenuDemo() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline">Actions</Button>}
        />
        <DropdownMenuContent
          align="start"
          className="w-32"
          matchAnchorWidth={false}
        >
          <DropdownMenuItem disabled>View details</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDialogOpen(true)}>
            Rename...
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete file</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename File</DialogTitle>
            <DialogDescription>
              Enter a new name for the selected file.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 py-4">
            <Label htmlFor="filename">Name</Label>
            <Input defaultValue="proposal_v2_final.pdf" id="filename" />
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <DialogClose render={<Button>Save Changes</Button>} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
