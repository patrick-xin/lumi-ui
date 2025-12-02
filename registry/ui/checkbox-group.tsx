import * as React from "react"
import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui-components/react/checkbox-group"
import { Checkbox } from "@/registry/ui/checkbox"

import { cn } from "@/lib/utils"

function CheckboxGroup({
  className,
  ...props
}: React.ComponentProps<typeof BaseCheckboxGroup>) {
  return (
    <BaseCheckboxGroup
      data-slot="checkbox-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

export { CheckboxGroup, Checkbox as CheckboxGroupItem }
