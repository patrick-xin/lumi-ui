"use client";

import { toast } from "@/hooks/use-toast"; // Import the helper, not the hook
import { Button } from "@/registry/ui/button";
import { Avatar } from "../../../registry/ui/avatar";

export function ToastDemo() {
  return (
    <div className="flex gap-2">
      {/* 1. Simple Usage */}
      <Button
        onClick={() =>
          toast("Event Created", {
            actionProps: {
              children: "View",
              onClick: () => {
                console.log("View");
              },
            },
            description: "Monday, January 3rd at 6:00pm",
          })
        }
      >
        Default
      </Button>

      {/* 2. Semantic Usage (Success/Error/etc) */}
      <Button
        variant="destructive"
        onClick={() =>
          toast("Deleted", {
            description: "File permanently removed",
            data: { className: "bg-red-600 text-white border-none" }, // Works now!
          })
        }
      >
        Delete
      </Button>

      {/* 2. Semantic Usage (Success/Error/etc) */}
      <Button
        onClick={() =>
          toast({
            data: {
              content: (
                <div className="flex items-center gap-4">
                  <Avatar />
                  <div>
                    <p className="font-bold">New Friend Request</p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm">Accept</Button>
                      <Button size="sm" variant="ghost">
                        Decline
                      </Button>
                    </div>
                  </div>
                </div>
              ),
            },
          })
        }
      >
        Request
      </Button>

      {/* 3. Promise Usage */}
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
