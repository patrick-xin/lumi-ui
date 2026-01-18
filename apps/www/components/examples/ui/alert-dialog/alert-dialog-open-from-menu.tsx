"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@lumi-ui/ui/alert-dialog";
import { Button } from "@lumi-ui/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@lumi-ui/ui/dropdown-menu";

export function AlertDialogOpenFromMenuDemo() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline">Open menu</Button>}
        />
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setDialogOpen(true)}>
            Open dialog
          </DropdownMenuItem>
          <DropdownMenuItem>Menu item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Settings</AlertDialogTitle>
            <AlertDialogDescription>
              Change your preferences
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose>Close</AlertDialogClose>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
