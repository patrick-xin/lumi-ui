"use client";

import React from "react";
import { Button } from "@lumi-ui/ui/button";
import { toast } from "@lumi-ui/ui/toast";

export function ToastUpdateDemo() {
  const [toastId, setToastId] = React.useState<string | null>(null);

  const createToast = () => {
    if (toastId) return;
    const id = toast.add({
      description: "You can update this toast.",
    });
    setToastId(id);
  };

  const updateToast = () => {
    if (!toastId) return;
    toast.update(toastId, {
      description: "Updated successfully!",
      type: "success",
    });
    setToastId(null);
  };

  return (
    <div className="flex gap-2">
      <Button disabled={!!toastId} onClick={createToast}>
        Create Toast
      </Button>
      {toastId && <Button onClick={updateToast}>Update</Button>}
    </div>
  );
}
