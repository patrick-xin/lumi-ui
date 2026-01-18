"use client";

import { Button } from "@lumi-ui/ui/button";
import { toast } from "@lumi-ui/ui/toast";

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
    </div>
  );
}
