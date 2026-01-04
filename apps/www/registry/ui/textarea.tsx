import type * as React from "react";

import { cn } from "@/lib/utils";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  variant?: "default" | "transparent";
}

function Textarea({ className, variant = "default", ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "bg-transparent w-full min-w-0 rounded-md shadow-xs border border-input transition-[color,box-shadow] outline-none",
        "focus-visible:border-ring/30 focus-visible:ring-1 focus-visible:ring-ring/10 focus-visible:ring-offset-1 focus-visible:ring-offset-ring/5",
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive/30 aria-invalid:ring-1 aria-invalid:ring-destructive/10 aria-invalid:ring-offset-1 aria-invalid:ring-offset-destructive/5",
        variant === "default" && "dark:bg-input/30",
        "px-2.5 py-1 text-base md:text-sm",
        "field-sizing-content min-h-16",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };