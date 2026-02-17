import { Switch as BaseSwitch } from "@base-ui/react/switch";

import { cn } from "@/registry/lib/utils";

function SwitchRoot(props: BaseSwitch.Root.Props) {
  return <BaseSwitch.Root data-slot="switch-root" {...props} />;
}

function SwitchThumb({ className, ...props }: BaseSwitch.Thumb.Props) {
  return (
    <BaseSwitch.Thumb
      className={cn("pointer-events-none", className)}
      data-slot="switch-thumb"
      {...props}
    />
  );
}

function Switch({ className, ...props }: BaseSwitch.Root.Props) {
  return (
    <BaseSwitch.Root
      className={cn(
        "peer inline-flex h-4.5 w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50",
        "has-[:focus-visible]:ring-4 focus-visible:outline-hidden",
        "data-[unchecked]:bg-input data-[checked]:bg-input",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className,
      )}
      data-slot="switch"
      {...props}
    >
      <BaseSwitch.Thumb
        className={cn(
          "bg-background pointer-events-none block size-4 rounded-full ring-0 transition-transform",
          "data-[unchecked]:translate-x-0 dark:data-[unchecked]:bg-muted-foreground",
          "data-[checked]:translate-x-[calc(100%-2px)] data-[checked]:bg-primary",
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
