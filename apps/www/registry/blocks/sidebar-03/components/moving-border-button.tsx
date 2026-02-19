import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";

export const MovingBorderButton = ({
  children,
  className,
  ...props
}: React.ComponentProps<typeof Button>) => {
  return (
    <Button
      className="relative overflow-hidden rounded-md p-px w-fit h-auto cursor-pointer"
      variant="unstyled"
      {...props}
    >
      <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,color-mix(in_srgb,var(--primary)_50%,transparent)_50%,transparent_100%)]" />
      <span className="relative z-10 flex flex-col h-full w-full justify-start items-start gap-2 bg-background hover:bg-background/90 rounded-[inherit] px-4 py-2 transition-colors">
        <span className={cn("font-medium", className)}>{children}</span>
      </span>
    </Button>
  );
};
