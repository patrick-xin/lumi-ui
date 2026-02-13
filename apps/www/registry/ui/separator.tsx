import { Separator as BaseSeparator } from "@base-ui/react/separator";

import { cn } from "@/registry/lib/utils";

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: BaseSeparator.Props) {
  return (
    <BaseSeparator
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className,
      )}
      data-slot="separator"
      orientation={orientation}
      {...props}
    />
  );
}

export { Separator };
