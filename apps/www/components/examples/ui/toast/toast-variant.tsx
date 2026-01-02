"use client";

import { Button } from "@/registry/ui/button";
import { toast } from "@/registry/ui/toast";

export function ToastVariantDemo() {
  return (
    <div className="flex flex-wrap gap-2">
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
        variant="outline"
        onClick={() =>
          toast.success({
            title: "Event Created",
            description: "Monday, January 3rd at 6:00pm",
          })
        }
      >
        Success
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toast.error({
            title: "Error creating event",
            description: "Something went wrong",
          })
        }
      >
        Error
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.warning({
            title: "Your connection to the server is unstable",
          })
        }
      >
        Warning
      </Button>
      <Button
        variant="glow"
        onClick={() =>
          toast.info({
            title: "Event reminder",
            description: "Don't forget to attend the event!",
          })
        }
      >
        Info
      </Button>
    </div>
  );
}
