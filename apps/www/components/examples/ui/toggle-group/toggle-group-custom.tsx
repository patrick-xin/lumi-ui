"use client";

import { Bold, Italic, Underline } from "lucide-react";
import { Toggle } from "@/registry/ui/toggle";
import { ToggleGroup } from "@/registry/ui/toggle-group";
import {
  createTooltipHandle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/ui/tooltip";

const tooltipHandle = createTooltipHandle<{ text: string }>();

export function ToggleGroupCustomDemo() {
  return (
    <TooltipProvider>
      <ToggleGroup
        className="gap-1 p-1 rounded-md bg-muted/50"
        multiple
        variant="outline"
      >
        <TooltipTrigger
          handle={tooltipHandle}
          payload={{ text: "Bold" }}
          render={
            <Toggle aria-label="Toggle bold" size="sm" value="bold">
              <Bold className="size-3.5" />
            </Toggle>
          }
        />

        <TooltipTrigger
          handle={tooltipHandle}
          payload={{ text: "Italic" }}
          render={
            <Toggle aria-label="Toggle italic" size="sm" value="italic">
              <Italic className="size-3.5" />
            </Toggle>
          }
        />
        <TooltipTrigger
          handle={tooltipHandle}
          payload={{ text: "Strikethrough" }}
          render={
            <Toggle
              aria-label="Toggle strikethrough"
              size="sm"
              value="strikethrough"
            >
              <Underline className="size-3.5" />
            </Toggle>
          }
        />
      </ToggleGroup>
      <Tooltip handle={tooltipHandle}>
        {({ payload }) => (
          <TooltipContent className="font-medium" side="top" sideOffset={10}>
            {payload?.text}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
