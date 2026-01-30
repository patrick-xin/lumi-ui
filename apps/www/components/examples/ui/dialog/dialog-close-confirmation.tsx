"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/registry/ui/alert-dialog";
import { Button } from "@/registry/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/ui/dialog";
import { Textarea } from "@/registry/ui/textarea";

export function DialogCloseConfirmationDemo() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);
  const [textareaValue, setTextareaValue] = React.useState("");

  return (
    <Dialog
      onOpenChange={(open) => {
        // Show the close confirmation if there’s text in the textarea
        if (!open && textareaValue) {
          setConfirmationOpen(true);
        } else {
          // Reset text when opening or closing normally
          setTextareaValue("");
          setDialogOpen(open);
        }
      }}
      open={dialogOpen}
    >
      <DialogTrigger render={<Button>Report Issue</Button>} />
      <DialogContent className="sm:max-w-96" layout="stacked" showCloseButton>
        <DialogHeader>
          <DialogTitle>Report an Issue</DialogTitle>
        </DialogHeader>
        <form
          className="mt-4 flex flex-col gap-6"
          onSubmit={(event) => {
            event.preventDefault();
            // Close the dialog when submitting
            setDialogOpen(false);
          }}
        >
          <Textarea
            className="min-h-48 resize-none"
            onChange={(event) => setTextareaValue(event.target.value)}
            placeholder="Please describe the bug or issue you are experiencing..."
            required
            value={textareaValue}
          />
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">Submit Report</Button>
          </DialogFooter>
        </form>
      </DialogContent>
      <AlertDialog onOpenChange={setConfirmationOpen} open={confirmationOpen}>
        <AlertDialogContent className="sm:max-w-md" layout="stacked">
          <AlertDialogHeader>
            <AlertDialogTitle>Discard changes?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to discard this
              report?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose variant="outline">Keep Editing</AlertDialogClose>
            <Button
              onClick={() => {
                setConfirmationOpen(false);
                setDialogOpen(false);
              }}
              variant="destructive"
            >
              Discard
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}
