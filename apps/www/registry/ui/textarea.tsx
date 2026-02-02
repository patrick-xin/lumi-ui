import type * as React from "react";

import { cn } from "@/registry/lib/utils";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  variant?: "default" | "transparent";
}

function Textarea({ className, variant = "default", ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "bg-transparent w-full min-w-0 rounded-md shadow-xs border border-input transition-[color,box-shadow] cursor-text",
        "focus-visible:outline focus-visible:outline-ring focus-visible:ring-4 focus-visible:ring-ring/10",
        "placeholder:text-muted-foreground placeholder:text-sm selection:bg-primary selection:text-primary-foreground",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:outline aria-invalid:outline-destructive/80 aria-invalid:ring-4 aria-invalid:ring-destructive/20",
        variant === "default" && "dark:bg-input/30",
        "px-2.5 py-1 text-sm",
        "field-sizing-content min-h-16",
        className,
      )}
      data-slot="textarea"
      {...props}
    />
  );
}

export { Textarea };
