"use client";

import { Button } from "@/registry/ui/button";
import { toast } from "@/registry/ui/toast";

export function ToastUndoActionDemo() {
  function action() {
    const id = toast.add({
      title: "Action performed",
      description: "You can undo this action.",
      actionProps: {
        children: "Undo",
        onClick() {
          toast.close(id);
          toast.add({
            title: "Action undone",
          });
        },
      },
    });
  }

  return (
    <Button variant="glow" onClick={action}>
      Undo action
    </Button>
  );
}
