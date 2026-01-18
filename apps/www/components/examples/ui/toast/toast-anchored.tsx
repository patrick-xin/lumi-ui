"use client";

import { CheckIcon, ClipboardIcon } from "lucide-react";
import React from "react";
import { Button } from "@lumi-ui/ui/button";
import { toast } from "@lumi-ui/ui/toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@lumi-ui/ui/tooltip";

export function ToastAnchoredDemo() {
  const [copied, setCopied] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);

  function handleCopy() {
    setCopied(true);

    toast.anchor(buttonRef.current, {
      title: "Copied",
      description: "Copied to clipboard",
      timeout: 1500,
      onClose() {
        setCopied(false);
      },
      side: "left",
    });
  }

  return (
    <div className="flex gap-2">
      <Tooltip
        disabled={copied}
        onOpenChange={(_, eventDetails) => {
          if (eventDetails.reason === "trigger-press") {
            eventDetails.cancel();
          }
        }}
      >
        <TooltipTrigger
          ref={buttonRef}
          onClick={handleCopy}
          aria-label="Copy to clipboard"
          render={<Button disabled={copied} variant={"outline"} />}
        >
          {copied ? (
            <CheckIcon className="size-4" />
          ) : (
            <ClipboardIcon className="size-4" />
          )}
        </TooltipTrigger>
        <TooltipContent>
          <p>Hello from tooltip!</p>
        </TooltipContent>
      </Tooltip>
      <Button
        onClick={() =>
          toast.success({
            title: "Stacked toast",
            description: "This is a stacked toast",
          })
        }
      >
        Stacked Toast
      </Button>
    </div>
  );
}
