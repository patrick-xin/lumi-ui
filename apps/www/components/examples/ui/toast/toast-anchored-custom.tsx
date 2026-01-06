"use client";

import type { TooltipPositionerProps } from "@base-ui/react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Sparkles,
  X,
} from "lucide-react";
import React from "react";
import { Button } from "@/registry/ui/button";
import { ToastClose, toast } from "@/registry/ui/toast";

export function CustomToastAnchoredDemo() {
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const activeToastId = React.useRef<string | null>(null);

  const [side, setSide] =
    React.useState<TooltipPositionerProps["side"]>("bottom");

  function showToast(targetSide: TooltipPositionerProps["side"]) {
    if (activeToastId.current) {
      toast.close(activeToastId.current);
    }
    const newId = toast.anchor(buttonRef.current, {
      customContent: <CustomContent />,
      side: targetSide,
      timeout: 3000,
    });
    if (newId) activeToastId.current = newId;
  }

  function handleClick() {
    showToast(side);
  }

  function handleSideChange(newSide: TooltipPositionerProps["side"]) {
    setSide(newSide);
    showToast(newSide);
  }

  return (
    <div className="flex gap-2 items-center">
      <Button onClick={handleClick} ref={buttonRef}>
        Show Custom Toast
      </Button>
      <Button
        disabled={side === "top"}
        onClick={() => handleSideChange("top")}
        size="icon-sm"
      >
        <ArrowUp className="size-4" />
      </Button>
      <Button
        disabled={side === "bottom"}
        onClick={() => handleSideChange("bottom")}
        size="icon-sm"
      >
        <ArrowDown className="size-4" />
      </Button>
      <Button
        disabled={side === "left"}
        onClick={() => handleSideChange("left")}
        size="icon-sm"
      >
        <ArrowLeft className="size-4" />
      </Button>
      <Button
        disabled={side === "right"}
        onClick={() => handleSideChange("right")}
        size="icon-sm"
      >
        <ArrowRight className="size-4" />
      </Button>
    </div>
  );
}

const CustomContent = () => {
  return (
    <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-md shadow-lg">
      <div className="shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
        <Sparkles className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-semibold text-sm mb-1">
          🎉 Magic Unlocked!
        </h3>
        <p className="text-white/90 text-xs leading-relaxed">
          You can customize toasts with any content.
        </p>
      </div>
      <div className="absolute top-1 right-2">
        <ToastClose
          render={
            <Button
              className="bg-white/20 hover:bg-white/30 size-6 rounded-full flex items-center justify-center"
              variant="unstyled"
            />
          }
        >
          <X className="size-3 text-white" />
        </ToastClose>
      </div>
    </div>
  );
};
