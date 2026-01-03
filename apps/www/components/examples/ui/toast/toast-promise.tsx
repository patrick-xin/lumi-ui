"use client";

import { Button } from "@/registry/ui/button";
import { toast } from "@/registry/ui/toast";

export function ToastPromiseDemo() {
  function runPromise() {
    toast.promise(
      new Promise<string>((resolve, reject) => {
        const shouldSucceed = Math.random() > 0.3;
        setTimeout(() => {
          if (shouldSucceed) {
            resolve("operation completed");
          } else {
            reject(new Error("operation failed"));
          }
        }, 2000);
      }),
      {
        loading: { title: "Loading data..." },
        success: (data: string) => {
          return {
            title: `Success: ${data}`,
            description: "Operation completed successfully",
            closable: true,
          };
        },
        error: (err: Error) => {
          return {
            title: `Error: ${err.message}`,
            actionProps: {
              children: "Contact support",
              onClick() {
                alert("Contact support");
              },
            },
          };
        },
      },
    );
  }

  return (
    <Button variant="glow" onClick={runPromise}>
      Promise
    </Button>
  );
}
