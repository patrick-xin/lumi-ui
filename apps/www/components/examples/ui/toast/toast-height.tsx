"use client";

import React from "react";
import { Button } from "@/registry/ui/button";
import { toast } from "@/registry/ui/toast";

export function ToastVeryingHeightsDemo() {
  const [count, setCount] = React.useState(0);
  function createToast() {
    setCount((prev) => prev + 1);
    const description = TEXTS[Math.floor(Math.random() * TEXTS.length)];
    toast.add({
      title: `Toast ${count + 1} created`,
      description,
    });
  }

  return (
    <Button variant="glow" onClick={createToast}>
      Create toast
    </Button>
  );
}

const TEXTS = [
  "Short message.",
  "A bit longer message that spans two lines.",
  "This is a longer description that intentionally takes more vertical space to demonstrate stacking with varying heights.",
  "An even longer description that should span multiple lines so we can verify the clamped collapsed height and smooth expansion animation when hovering or focusing the viewport.",
];
