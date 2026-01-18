"use client";

import { Button } from "@lumi-ui/ui/button";
import { toast } from "@lumi-ui/ui/toast";

export function ToastClosableDemo() {
  return (
    <div className="flex gap-2">
      <Button
        onClick={() =>
          toast.add({
            title: "Event Created",
            description: "Monday, January 3rd at 6:00pm",
            closable: true,
          })
        }
      >
        Closable
      </Button>
    </div>
  );
}
