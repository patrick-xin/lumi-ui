"use client";

import type { AlertDialogRootChangeEventDetails } from "@base-ui/react";
import * as React from "react";
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
} from "@lumi-ui/ui/alert-dialog";
import { Button } from "@lumi-ui/ui/button";

type AlertPayload = { message: string };

const demoAlertDialog = createAlertDialogHandle<AlertPayload>();

export default function AlertDialogDetachedTriggersControlledDemo() {
  const [open, setOpen] = React.useState(false);
  const [triggerId, setTriggerId] = React.useState<string | null>(null);

  const handleOpenChange = (
    isOpen: boolean,
    eventDetails: AlertDialogRootChangeEventDetails,
  ) => {
    setOpen(isOpen);
    setTriggerId(eventDetails.trigger?.id ?? null);
  };

  return (
    <React.Fragment>
      <div className="flex flex-wrap gap-2 justify-center">
        <AlertDialogTrigger
          handle={demoAlertDialog}
          id="alert-trigger-1"
          payload={{ message: "Discard draft?" }}
          render={<Button variant="destructive">Discard draft</Button>}
        />
        <AlertDialogTrigger
          handle={demoAlertDialog}
          id="alert-trigger-2"
          payload={{ message: "Delete project?" }}
          render={<Button variant="destructive">Delete project</Button>}
        />
        <AlertDialogTrigger
          handle={demoAlertDialog}
          id="alert-trigger-3"
          payload={{ message: "Sign out?" }}
          render={<Button variant="secondary">Sign out</Button>}
        />
        <Button
          onClick={() => {
            setTriggerId("alert-trigger-2");
            setOpen(true);
          }}
        >
          Open programmatically
        </Button>
      </div>
      <AlertDialog<AlertPayload>
        handle={demoAlertDialog}
        open={open}
        onOpenChange={handleOpenChange}
        triggerId={triggerId}
      >
        {({ payload }) => (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {payload?.message ?? "Are you sure?"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogClose variant="outline">Cancel</AlertDialogClose>
              <AlertDialogClose>Confirm</AlertDialogClose>
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </AlertDialog>
    </React.Fragment>
  );
}
