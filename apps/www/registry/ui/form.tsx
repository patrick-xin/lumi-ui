import { Form as BaseForm } from "@base-ui/react/form";
import type * as React from "react";

import { cn } from "@/registry/lib/utils";

function Form({ className, ...props }: React.ComponentProps<typeof BaseForm>) {
  return (
    <BaseForm
      className={cn("flex flex-col gap-6", className)}
      data-slot="form"
      {...props}
    />
  );
}

type FormProps = React.ComponentProps<typeof BaseForm>;
type FormErrors = NonNullable<FormProps["errors"]>;
type FormValues = Record<string, unknown>;

export { Form };
export type { FormErrors, FormProps, FormValues };
