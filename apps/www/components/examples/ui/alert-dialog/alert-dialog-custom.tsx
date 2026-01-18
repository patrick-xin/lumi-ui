"use client";

import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogPopup,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@lumi-ui/ui/alert-dialog";
import { Button } from "@lumi-ui/ui/button";

export default function AlertDialogCustomDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button>Discard draft</Button>} />
      <AlertDialogPortal>
        <AlertDialogBackdrop className="backdrop-blur-3xl" />
        <AlertDialogPopup className="fixed top-1/2 left-1/2 -mt-32 w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg p-6 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0">
          <AlertDialogTitle className="-mt-1.5 mb-1 text-lg font-medium">
            Discard draft?
          </AlertDialogTitle>
          <AlertDialogDescription className="mb-6 text-base text-destructive">
            You can’t undo this action.
          </AlertDialogDescription>
          <div className="flex justify-end gap-4">
            <AlertDialogClose variant="outline">Cancel</AlertDialogClose>
            <AlertDialogClose>Discard</AlertDialogClose>
          </div>
        </AlertDialogPopup>
      </AlertDialogPortal>
    </AlertDialog>
  );
}
