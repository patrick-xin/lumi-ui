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
        render={<Button variant="destructive">Delete Report</Button>}
        handle={deleteAlertHandle}
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
            <AlertDialogClose variant="outline">Cancel</AlertDialogClose>
            <AlertDialogClose>Discard</AlertDialogClose>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
