import type { SwitchRootProps } from "@base-ui/react/switch";
import { CircleIcon, MinusIcon } from "lucide-react";
import { cn } from "@/registry/lib/utils";
import { SwitchRoot, SwitchThumb } from "@/registry/ui/switch";

export function SwitchCustomDemo({ className, ...props }: SwitchRootProps) {
  return (
    <SwitchRoot
      className={cn(
        "group relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-lg border border-transparent transition-colors duration-200 outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "data-unchecked:bg-background data-unchecked:border-input data-unchecked:hover:bg-muted/70",
        "data-checked:bg-primary data-checked:border-primary data-checked:hover:bg-primary/90",
        className,
      )}
      data-slot="switch"
      {...props}
    >
      {/* Track Background Indicators */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex size-full items-center"
      >
        <div className="flex h-full w-1/2 items-center justify-center">
          <MinusIcon className="size-4.5 text-primary-foreground rotate-90 opacity-0 transition-opacity duration-200 group-data-checked:opacity-100" />
        </div>
        <div className="flex h-full w-1/2 items-center justify-center">
          <CircleIcon className="size-3 text-muted-foreground opacity-100 transition-opacity duration-200 group-data-checked:opacity-0" />
        </div>
      </div>

      <SwitchThumb
        className={cn(
          "pointer-events-none relative block size-6 rounded-md shadow-sm transition-all duration-200",
          "data-unchecked:translate-x-0.5 data-unchecked:bg-muted group-hover:data-unchecked:bg-primary/10",
          "data-checked:translate-x-6.5 data-checked:bg-background group-hover:data-checked:bg-background/90",
        )}
        data-slot="switch-thumb"
      />
    </SwitchRoot>
  );
}
