import { Switch as BaseSwitch } from "@base-ui/react/switch";
import type * as React from "react";

import { cn } from "@/registry/lib/utils";

function SwitchRoot(props: React.ComponentProps<typeof BaseSwitch.Root>) {
  return <BaseSwitch.Root data-slot="switch-root" {...props} />;
}

function SwitchThumb({
  className,
  ...props
}: React.ComponentProps<typeof BaseSwitch.Thumb>) {
  return (
    <BaseSwitch.Thumb
      className={cn("pointer-events-none", className)}
      data-slot="switch-thumb"
      {...props}
    />
  );
}

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof BaseSwitch.Root>) {
  return (
    <BaseSwitch.Root
      className={cn(
        "peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50",
        "has-[:focus-visible]:ring-4 focus-visible:outline-hidden",
        "data-[unchecked]:bg-input dark:data-[unchecked]:bg-input/80",
        "data-[checked]:bg-primary",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className,
      )}
      data-slot="switch"
      {...props}
    >
      <BaseSwitch.Thumb
        className={cn(
          "bg-background pointer-events-none block size-4 rounded-full ring-0 transition-transform",
          "data-[unchecked]:translate-x-0 dark:data-[unchecked]:bg-foreground",
          "data-[checked]:translate-x-[calc(100%-2px)] dark:data-[checked]:bg-primary-foreground",
        )}
        data-slot="switch-thumb"
      />
    </BaseSwitch.Root>
  );
}

export {
  SwitchRoot,
  SwitchThumb,
  // Composite component
  Switch,
};
