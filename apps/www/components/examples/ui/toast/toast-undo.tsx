"use client";

import { Button } from "@lumi-ui/ui/button";
import { toast } from "@lumi-ui/ui/toast";

export function ToastUndoActionDemo() {
  function action() {
    const id = toast.add({
      actionProps: {
        children: "Undo",
        onClick() {
          toast.close(id);
          toast.add({
            title: "Action undone",
          });
        },
      },
      description: "You can undo this action.",
      title: "Action performed",
    });
  }

  return <Button onClick={action}>Undo action</Button>;
}
