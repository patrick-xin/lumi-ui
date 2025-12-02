"use client"

import * as React from "react"
import { Switch as BaseSwitch } from "@base-ui-components/react/switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof BaseSwitch.Root>) {
  return (
    <BaseSwitch.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "data-[unchecked]:bg-input dark:data-[unchecked]:bg-input/80",
        "data-[checked]:bg-primary",
        className
      )}
      {...props}
    >
      <BaseSwitch.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background pointer-events-none block size-4 rounded-full ring-0 transition-transform",
          "data-[unchecked]:translate-x-0 dark:data-[unchecked]:bg-foreground",
          "data-[checked]:translate-x-[calc(100%-2px)] dark:data-[checked]:bg-primary-foreground"
        )}
      />
    </BaseSwitch.Root>
  )
}

export { Switch }