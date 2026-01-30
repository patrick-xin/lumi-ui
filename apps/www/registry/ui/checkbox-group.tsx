import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group";
import type * as React from "react";
import { Checkbox } from "@/registry/ui/checkbox";

import { cn } from "@/registry/lib/utils";

function CheckboxGroup({
  className,
  ...props
}: React.ComponentProps<typeof BaseCheckboxGroup>) {
  return (
    <BaseCheckboxGroup
      className={cn("grid gap-3", className)}
      data-slot="checkbox-group"
      {...props}
    />
  );
}

export { CheckboxGroup, Checkbox as CheckboxGroupItem };
