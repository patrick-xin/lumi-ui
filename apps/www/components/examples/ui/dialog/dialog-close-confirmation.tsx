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
          setTextareaValue("");
          // Open or close the dialog normally
          setDialogOpen(open);
        }
      }}
      open={dialogOpen}
    >
      <DialogTrigger render={<Button>Tweet</Button>} />
      <DialogContent className="sm:max-w-96" layout="stacked" showCloseButton>
        <DialogHeader>
          <DialogTitle>New tweet</DialogTitle>
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
            className="min-h-48"
            onChange={(event) => setTextareaValue(event.target.value)}
            placeholder="What’s on your mind?"
            required
            value={textareaValue}
          />
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">Tweet</Button>
          </DialogFooter>
        </form>
      </DialogContent>

      {/* Confirmation dialog */}
      <AlertDialog onOpenChange={setConfirmationOpen} open={confirmationOpen}>
        <AlertDialogContent className="sm:max-w-md" layout="stacked">
          <AlertDialogHeader>
            <AlertDialogTitle>Discard tweet?</AlertDialogTitle>
            <AlertDialogDescription>
              Your tweet will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose variant="outline">Go back</AlertDialogClose>
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
