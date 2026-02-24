"use client";

import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { CircleIcon } from "lucide-react";
import { cn } from "../../lib/utils";

function RadioGroup({ className, ...props }: BaseRadioGroup.Props) {
  return (
    <BaseRadioGroup
      className={cn("grid gap-3", className)}
      data-slot="radio-group"
      {...props}
    />
  );
}

function RadioRoot({ className, ...props }: BaseRadio.Root.Props) {
  return (
    <BaseRadio.Root
      className={cn("rounded-full", className)}
      data-slot="radio"
      {...props}
    />
  );
}

function RadioIndicator({ className, ...props }: BaseRadio.Indicator.Props) {
  return (
    <BaseRadio.Indicator
      className={cn("data-unchecked:hidden", className)}
      data-slot="radio-indicator"
      {...props}
    />
  );
}

function Radio({ className, ...props }: BaseRadio.Root.Props) {
  return (
    <BaseRadio.Root
      className={cn(
        "bg-transparent border-input text-primary dark:bg-input/30",
        "flex aspect-square size-4 shrink-0 items-center justify-center",
        "rounded-full border shadow-xs",
        "transition-[color,box-shadow]",
        "focus-visible:outline focus-visible:outline-ring focus-visible:ring-4 focus-visible:ring-ring/10",
        "aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/10",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      data-slot="radio"
      {...props}
    >
      <BaseRadio.Indicator
        className="flex items-center justify-center data-[unchecked]:hidden"
        data-slot="radio-group-indicator"
      >
        <CircleIcon className="size-2 fill-primary" />
      </BaseRadio.Indicator>
    </BaseRadio.Root>
  );
}

export {
  RadioGroup,
  RadioRoot,
  RadioIndicator,
  // Composite component
  Radio,
};
