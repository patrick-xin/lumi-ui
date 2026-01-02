"use client";

import { Button } from "@/registry/ui/button";
import { toast } from "@/registry/ui/toast";

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
