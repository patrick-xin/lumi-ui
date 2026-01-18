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
} from "@lumi-ui/ui/alert-dialog";
import { Button } from "@lumi-ui/ui/button";

export function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="outline">Show Alert Dialog</Button>}
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogClose variant="outline">Cancel</AlertDialogClose>
          <AlertDialogClose>Continue</AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
