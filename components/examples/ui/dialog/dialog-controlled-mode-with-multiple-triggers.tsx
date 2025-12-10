"use client";

import type { DialogRootChangeEventDetails } from "@base-ui-components/react";
import * as React from "react";
import { Button } from "@/registry/ui/button";
import {
  createDialogHandle,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/ui/dialog";

const demoDialog = createDialogHandle<number>();

export default function DialogDetachedTriggersControlledDemo() {
  const [open, setOpen] = React.useState(false);
  const [triggerId, setTriggerId] = React.useState<string | null>(null);

  const handleOpenChange = (
    isOpen: boolean,
    eventDetails: DialogRootChangeEventDetails,
  ) => {
    setOpen(isOpen);
    setTriggerId(eventDetails.trigger?.id ?? null);
  };

  return (
    <React.Fragment>
      <div className="flex gap-2 flex-wrap justify-center">
        <DialogTrigger
          render={<Button>Open 1</Button>}
          handle={demoDialog}
          id="trigger-1"
          payload={1}
        />

        <DialogTrigger
          render={<Button>Open 2</Button>}
          handle={demoDialog}
          id="trigger-2"
          payload={2}
        />

        <DialogTrigger
          render={<Button>Open 3</Button>}
          handle={demoDialog}
          id="trigger-3"
          payload={3}
        />

        <Button
          variant="outline"
          onClick={() => {
            setTriggerId("trigger-2");
            setOpen(true);
          }}
        >
          Open programmatically (Dialog 2)
        </Button>
      </div>

      <Dialog
        handle={demoDialog}
        open={open}
        onOpenChange={handleOpenChange}
        triggerId={triggerId}
      >
        {({ payload }) => (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog {payload}</DialogTitle>
            </DialogHeader>

            <DialogFooter>
              <DialogClose render={<Button>Close</Button>} />
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </React.Fragment>
  );
}
