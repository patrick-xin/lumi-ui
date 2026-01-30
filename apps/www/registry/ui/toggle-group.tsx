"use client";

import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";
import { Toggle, type toggleVariants } from "@/registry/ui/toggle";
import { cn } from "@/registry/lib/utils";

function ToggleGroup({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseToggleGroup>) {
  return (
    <BaseToggleGroup
      className={cn(
        "flex w-fit items-center gap-px rounded-md p-0.5",
        className,
      )}
      {...props}
    >
      {children}
    </BaseToggleGroup>
  );
}

interface ToggleGroupItemProps extends React.ComponentProps<typeof Toggle> {
  variant?: VariantProps<typeof toggleVariants>["variant"];
  size?: VariantProps<typeof toggleVariants>["size"];
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: ToggleGroupItemProps) {
  return (
    <Toggle className={cn(className)} size={size} variant={variant} {...props}>
      {children}
    </Toggle>
  );
}

export { ToggleGroup, ToggleGroupItem };
