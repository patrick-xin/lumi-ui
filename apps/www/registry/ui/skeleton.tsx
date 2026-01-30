import { cn } from "@/registry/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("bg-muted rounded-none animate-pulse", className)}
      data-slot="skeleton"
      {...props}
    />
  );
}

export { Skeleton };
