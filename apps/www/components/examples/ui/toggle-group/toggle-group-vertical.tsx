"use client";

import { Bold, Italic, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group";

export function ToggleGroupVerticalDemo() {
  return (
    <ToggleGroup multiple orientation="vertical" size="sm" variant="outline">
      <ToggleGroupItem aria-label="Toggle bold" value="bold">
        <Bold className="size-3.5" />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle italic" value="italic">
        <Italic className="size-3.5" />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle strikethrough" value="strikethrough">
        <Underline className="size-3.5" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
