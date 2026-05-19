import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/registry/lib/utils";

function SwitchRoot(props: BaseSwitch.Root.Props) {
  return <BaseSwitch.Root data-slot="switch" {...props} />;
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

const switchVariants = cva(
  [
    "shrink-0 rounded-full border border-transparent peer group/switch relative inline-flex items-center transition-all outline-0",
    "after:absolute after:-inset-x-3 after:-inset-y-2",
    "data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80",
    "focus-visible:outline focus-visible:outline-ring focus-visible:outline-offset-2 focus-visible:ring-4 focus-visible:ring-primary/30",
    "aria-invalid:outline aria-invalid:outline-destructive/80 aria-invalid:ring-4 aria-invalid:ring-destructive/20",
    "aria-invalid:focus-visible:outline-destructive aria-invalid:focus-visible:outline-offset-2 aria-invalid:focus-visible:ring-destructive/20",
    "data-disabled:cursor-default data-disabled:opacity-50",
  ],
  {
    defaultVariants: {
      size: "default",
    },
    variants: {
      size: {
        default: "h-5 w-9",
        lg: "h-6 w-11",
        sm: "h-4 w-7",
      },
    },
  },
);

const switchThumbVariants = cva(
  [
    "bg-background dark:data-unchecked:bg-foreground dark:data-checked:bg-primary-foreground",
    "rounded-full pointer-events-none block ring-0 transition-transform",
  ],
  {
    defaultVariants: {
      size: "default",
    },
    variants: {
      size: {
        default:
          "size-4 data-checked:translate-x-4.5 data-unchecked:translate-x-0",
        lg: "size-5 data-checked:translate-x-5.5 data-unchecked:translate-x-0",
        sm: "size-3 data-checked:translate-x-3.5 data-unchecked:translate-x-0",
      },
    },
  },
);

function Switch({
  className,
  size = "default",
  ...props
}: BaseSwitch.Root.Props & VariantProps<typeof switchVariants>) {
  return (
    <BaseSwitch.Root
      className={cn(switchVariants({ size }), className)}
      data-slot="switch"
      {...props}
    >
      <BaseSwitch.Thumb
        className={cn(switchThumbVariants({ size }))}
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
