"use client";

import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { CheckIcon, MinusIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "@/registry/lib/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof BaseCheckbox.Root>) {
  return (
    <BaseCheckbox.Root
      className={cn(
        "peer inline-flex size-4 shrink-0 rounded-sm border border-input shadow-xs transition-shadow",
        "data-checked:bg-primary data-checked:text-primary-foreground data-checked:border-primary",
        "data-indeterminate:bg-primary data-indeterminate:text-primary-foreground data-indeterminate:border-primary",
        "focus-visible:outline focus-visible:outline-ring focus-visible:ring-4 focus-visible:outline-offset-2 focus-visible:ring-primary/30",
        "data-invalid:ring-destructive/20 dark:data-invalid:ring-destructive/40 data-invalid:border-destructive",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className,
      )}
      data-slot="checkbox"
      {...props}
    >
      <BaseCheckbox.Indicator
        className="flex items-center justify-center text-current data-[unchecked]:hidden"
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

export { Checkbox };
