import * as React from "react"
import { Form as BaseForm } from "@base-ui/react/form"

import { cn } from "@lumi-ui/ui/lib/utils"

function Form({
  className,
  ...props
}: React.ComponentProps<typeof BaseForm>) {
  return (
    <BaseForm
      data-slot="form"
      className={cn("flex flex-col gap-6", className)}
      {...props}
    />
  )
}

type FormProps = React.ComponentProps<typeof BaseForm>
type FormErrors = NonNullable<FormProps["errors"]>
type FormValues = Record<string, unknown>

export { Form }
export type { FormErrors, FormProps, FormValues }