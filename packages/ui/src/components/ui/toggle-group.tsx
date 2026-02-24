"use client";

import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import { cn } from "../../lib/utils";
import { Toggle } from "./toggle";

function ToggleGroup({ className, children, ...props }: BaseToggleGroup.Props) {
  return (
    <BaseToggleGroup
      className={cn(
        "flex w-fit items-center gap-px rounded-md p-0.5",
        className,
      )}
      data-slot="toggle-group"
      {...props}
    >
      {children}
    </BaseToggleGroup>
  );
}

export { ToggleGroup, Toggle as ToggleGroupItem };
