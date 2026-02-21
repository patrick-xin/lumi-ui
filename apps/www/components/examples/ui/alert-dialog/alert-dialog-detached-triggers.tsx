"use client";

import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  createAlertDialogHandle,
} from "@/registry/ui/alert-dialog";
import { Button } from "@/registry/ui/button";

const deleteAlertHandle = createAlertDialogHandle();

export function AlertDialogDetachedTriggerDemo() {
  return (
    <div className="flex gap-4 p-8">
      {/* Outside of AlertDialog */}
      <AlertDialogTrigger
        handle={deleteAlertHandle}
        render={<Button variant="destructive">Delete Report</Button>}
      />
      <AlertDialog handle={deleteAlertHandle}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard draft?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose render={<Button variant="outline" />}>
              Cancel
            </AlertDialogClose>
            <AlertDialogClose render={<Button />}>Discard</AlertDialogClose>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
