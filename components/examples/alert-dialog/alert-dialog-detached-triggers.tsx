"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  createAlertDialogHandle,
} from "@/registry/ui/alert-dialog";
import { Button } from "@/registry/ui/button";

// 1. Create a handle with type
type AlertPayload = { id: string; name: string };
const deleteAlertHandle = createAlertDialogHandle<AlertPayload>();

export function DetachedTriggerDemo() {
  return (
    <div className="flex gap-4 p-8">
      {/* 2. Triggers live anywhere */}
      <AlertDialogTrigger
        render={<Button variant="destructive">Delete Report</Button>}
        handle={deleteAlertHandle}
        payload={{ id: "file-123", name: "Annual_Report.pdf" }}
      />

      <AlertDialogTrigger
        render={<Button variant="destructive">Delete User</Button>}
        handle={deleteAlertHandle}
        payload={{ id: "user-999", name: "John Doe" }}
      />

      {/* 3. Single Root handles multiple triggers */}
      <AlertDialog handle={deleteAlertHandle}>
        {/* 4. Use function-as-child to access payload */}
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
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Yes, Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </AlertDialog>
    </div>
  );
}
