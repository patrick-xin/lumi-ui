import { cn } from "@/lib/utils";

export function Steps({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "steps lg:border-l lg:pl-8 [counter-reset:step] *:[h3]:first:!mt-2  [&_[data-slot=collapsible]]:mt-4 [&_figure:not(:first-child)]:mt-4",
        className,
      )}
      {...props}
    />
  );
}

export function Step({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "step mt-6 font-semibold tracking-tight scroll-m-32 text-lg",
        className,
      )}
      {...props}
    />
  );
}
