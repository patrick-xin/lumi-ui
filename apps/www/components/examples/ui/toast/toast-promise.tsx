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
        error: (err: Error) => {
          return {
            actionProps: {
              children: "Contact support",
              onClick() {
                alert("Contact support");
              },
            },
            title: `Error: ${err.message}`,
          };
        },
        loading: { title: "Loading data..." },
        success: (data: string) => {
          return {
            closable: true,
            description: "Operation completed successfully",
            title: `Success: ${data}`,
          };
        },
      },
    );
  }

  return <Button onClick={runPromise}>Promise</Button>;
}
