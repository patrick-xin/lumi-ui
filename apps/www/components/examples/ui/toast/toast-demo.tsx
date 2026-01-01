"use client";

import { Button } from "@/registry/ui/button";
import { toast } from "@/registry/ui/toast";

export function ToastDemo() {
  return (
    <div className="flex gap-2">
      <Button
        onClick={() =>
          toast.add({
            title: "Event Created",
            description: "Monday, January 3rd at 6:00pm",
          })
        }
      >
        Default
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toast.error({
            title: "Deleted",
            description: "File permanently removed",
          })
        }
      >
        Delete
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
            loading: "Saving...",
            success: "Saved successfully",
            error: "Could not save",
          })
        }
      >
        Promise
      </Button>
    </div>
  );
}
