"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/registry/ui/alert-dialog";
import { Button } from "@/registry/ui/button";
import {
  Dialog,
  DialogClose,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/registry/ui/dialog";
import { Textarea } from "@/registry/ui/textarea";

export default function AlertDialogCloseConfirmationDemo() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);
  const [textareaValue, setTextareaValue] = React.useState("");

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open) => {
        // Show the close confirmation if there’s text in the textarea
        if (!open && textareaValue) {
          setConfirmationOpen(true);
        } else {
          // Reset the text area value
          setTextareaValue("");
          // Open or close the dialog normally
          setDialogOpen(open);
        }
      }}
    >
      <DialogTrigger render={<Button variant="outline">Tweet</Button>} />
      <DialogPopup>
        <DialogTitle className="-mt-1.5 mb-1 text-lg font-medium">
          New tweet
        </DialogTitle>
        <form
          className="mt-4 flex flex-col gap-6"
          onSubmit={(event) => {
            event.preventDefault();
            // Close the dialog when submitting
            setDialogOpen(false);
          }}
        >
          <Textarea
            required
            placeholder="What’s on your mind?"
            value={textareaValue}
            onChange={(event) => setTextareaValue(event.target.value)}
          />
          <div className="flex justify-end gap-4">
            <DialogClose render={<Button variant="outline">Cancel</Button>} />

            <Button type="submit">Tweet</Button>
          </div>
        </form>
      </DialogPopup>

      {/* Confirmation dialog */}
      <AlertDialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
        <AlertDialogContent>
          <AlertDialogTitle className="-mt-1.5 mb-1 text-lg font-medium">
            Discard tweet?
          </AlertDialogTitle>
          <AlertDialogDescription className="mb-6">
            Your tweet will be lost.
          </AlertDialogDescription>
          <div className="flex items-center justify-end gap-4">
            <AlertDialogClose variant="outline">Go back</AlertDialogClose>
            <Button
              type="button"
              onClick={() => {
                setConfirmationOpen(false);
                setDialogOpen(false);
              }}
            >
              Discard
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}
