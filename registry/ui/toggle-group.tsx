"use client"

import * as React from "react"
import { ToggleGroup as BaseToggleGroup } from "@base-ui-components/react/toggle-group"
import { Toggle, toggleVariants } from "@/registry/ui/toggle"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number
  }
>({
  size: "default",
  variant: "default",
  spacing: 0,
})

interface ToggleGroupProps
  extends React.ComponentProps<typeof BaseToggleGroup>,
    VariantProps<typeof toggleVariants> {
  spacing?: number
}

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 0,
  children,
  ...props
}: ToggleGroupProps) {
  return (
    <BaseToggleGroup
      data-spacing={spacing}
      style={{ "--gap": spacing } as React.CSSProperties}
      className={cn(
        "group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, spacing }}>
        {children}
      </ToggleGroupContext.Provider>
    </BaseToggleGroup>
  )
}

interface ToggleGroupItemProps
  extends React.ComponentProps<typeof Toggle> {
    variant?: VariantProps<typeof toggleVariants>["variant"]
    size?: VariantProps<typeof toggleVariants>["size"]
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: ToggleGroupItemProps) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <Toggle
      variant={context.variant || variant}
      size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        "data-[spacing=0]:rounded-none data-[spacing=0]:shadow-none data-[spacing=0]:first:rounded-l-md data-[spacing=0]:last:rounded-r-md data-[spacing=0]:data-[variant=outline]:border-l-0 data-[spacing=0]:data-[variant=outline]:first:border-l",
        className
      )}
      {...props}
    >
      {children}
    </Toggle>
  )
}

export { ToggleGroup, ToggleGroupItem }
export type { ToggleGroupProps, ToggleGroupItemProps }