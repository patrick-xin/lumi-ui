"use client";

import React from "react";
import { Button } from "@/registry/ui/button";
import { toast } from "@/registry/ui/toast";

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
      <Button variant="glow" onClick={createToast} disabled={!!toastId}>
        Create Toast
      </Button>
      {toastId && (
        <Button variant="glow" onClick={updateToast}>
          Update
        </Button>
      )}
    </div>
  );
}
