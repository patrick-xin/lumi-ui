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

type AlertPayload = { id: string; name: string };

const deleteAlertHandle = createAlertDialogHandle<AlertPayload>();

export function AlertDialogRenderDifferentContentDemo() {
  return (
    <div className="flex gap-4 p-8">
      <AlertDialogTrigger
        handle={deleteAlertHandle}
        payload={{ id: "file-123", name: "Annual_Report.pdf" }}
        render={<Button variant="destructive">Delete Report</Button>}
      />

      <AlertDialogTrigger
        handle={deleteAlertHandle}
        payload={{ id: "user-999", name: "John Doe" }}
        render={<Button variant="destructive">Delete User</Button>}
      />

      <AlertDialog handle={deleteAlertHandle}>
        {({ payload }) => (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete {payload?.name}?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete item ID: {payload?.id}? This
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogClose render={<Button variant="outline" />}>
                Cancel
              </AlertDialogClose>
              <AlertDialogClose render={<Button />}>
                Yes, Delete
              </AlertDialogClose>
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </AlertDialog>
    </div>
  );
}
