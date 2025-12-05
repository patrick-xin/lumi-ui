"use client"

import * as React from "react";
import { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";
import { CheckIcon, MinusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof BaseCheckbox.Root>) {
  return (
    <BaseCheckbox.Root
      data-slot="checkbox"
      className={cn(
        "peer size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none",
        // Base styles
        "border-input dark:bg-input/30",
        // Checked styles
        "data-[checked]:bg-primary data-[checked]:text-primary-foreground data-[checked]:border-primary",
        // Indeterminate styles
        "data-[indeterminate]:bg-primary data-[indeterminate]:text-primary-foreground data-[indeterminate]:border-primary",
        // Focus styles
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        // Invalid/error styles
        "data-[invalid]:ring-destructive/20 dark:data-[invalid]:ring-destructive/40 data-[invalid]:border-destructive",
        // Disabled styles
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <BaseCheckbox.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current data-[unchecked]:hidden"
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
  )
}

export { Checkbox }