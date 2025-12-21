import type React from "react";
import { cn } from "@/lib/utils";

export function Steps({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "steps lg:border-l lg:pl-8 [counter-reset:step] *:[div]:first:!mt-2  [&_[data-slot=collapsible]]:mt-4 [&_figure:not(:first-child)]:mt-4",
        className,
      )}
      {...props}
    />
  );
}

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export function Step({ title, className, children, ...props }: StepProps) {
  return (
    <div className={cn("relative mt-8 pt-2", className)} {...props}>
      <div className={cn("step text-base scroll-m-32")}>{title}</div>
      <div className="mt-4">{children}</div>
    </div>
  );
}
