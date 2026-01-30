"use client";

import { Button } from "@/registry/ui/button";
import { toast } from "@/registry/ui/toast";

export function ToastVariantDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          toast.add({
            description: "Monday, January 3rd at 6:00pm",
            title: "Event Created",
          })
        }
      >
        Default
      </Button>
      <Button
        onClick={() =>
          toast.success({
            description: "Monday, January 3rd at 6:00pm",
            title: "Event Created",
          })
        }
      >
        Success
      </Button>
      <Button
        onClick={() =>
          toast.error({
            description: "Something went wrong",
            title: "Error creating event",
          })
        }
      >
        Error
      </Button>
      <Button
        onClick={() =>
          toast.warning({
            title: "Your connection to the server is unstable",
          })
        }
      >
        Warning
      </Button>
      <Button
        onClick={() =>
          toast.info({
            description: "Don't forget to attend the event!",
            title: "Event reminder",
          })
        }
      >
        Info
      </Button>
    </div>
  );
}
