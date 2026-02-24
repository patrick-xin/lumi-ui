"use client";

import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { CheckIcon, MinusIcon } from "lucide-react";

import { cn } from "@/registry/lib/utils";

function CheckboxRoot({ className, ...props }: BaseCheckbox.Root.Props) {
  return (
    <BaseCheckbox.Root
      className={cn(className)}
      data-slot="checkbox"
      {...props}
    />
  );
}

function CheckboxIndicator({
  className,
  ...props
}: BaseCheckbox.Indicator.Props) {
  return (
    <BaseCheckbox.Indicator
      className={cn(className)}
      data-slot="checkbox-indicator"
      {...props}
    />
  );
}

function Checkbox({ className, ...props }: BaseCheckbox.Root.Props) {
  return (
    <BaseCheckbox.Root
      className={cn(
        "peer inline-flex size-4 shrink-0 rounded-sm border border-input shadow-xs transition-shadow",
        "data-checked:bg-primary data-checked:text-primary-foreground data-checked:border-primary",
        "data-indeterminate:bg-primary data-indeterminate:text-primary-foreground data-indeterminate:border-primary",
        "data-checked:focus-visible:outline-offset-2 data-checked:focus-visible:ring-primary/30",
        "focus-visible:outline focus-visible:outline-ring focus-visible:ring-4 focus-visible:ring-ring/10",
        "data-invalid:focus-visible:outline-destructive data-invalid:focus-visible:outline-offset-2 data-invalid:focus-visible:ring-destructive/30",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className,
      )}
      data-slot="checkbox"
      {...props}
    >
      <BaseCheckbox.Indicator
        className="flex items-center justify-center text-current data-unchecked:hidden"
        data-slot="checkbox-indicator"
        render={(props, state) => (
          <span {...props}>
            {state.indeterminate ? (
              <MinusIcon className="size-3.5" />
            ) : (
              <CheckIcon className="size-3.5" />
            )}
          </span>
        )}
      />
    </BaseCheckbox.Root>
  );
}

export {
  CheckboxRoot,
  CheckboxIndicator,
  // Composite component
  Checkbox,
};
