"use client";

import { CheckIcon, ListFilter, WrapText } from "lucide-react";
import * as React from "react";
import {
  ContextMenu,
  ContextMenuCheckboxItemContent,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItemContent,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/registry/ui/context-menu";

export function ContextMenuCompositeAdvantagesDemo() {
  const [showMiniMap, setShowMiniMap] = React.useState(true);
  const [wordWrap, setWordWrap] = React.useState(false);
  const [density, setDensity] = React.useState("comfortable");

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[320px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click for composite helpers
      </ContextMenuTrigger>

      <ContextMenuContent className="w-64">
        <ContextMenuGroup>
          <ContextMenuLabel inset>Editor layout</ContextMenuLabel>
          <ContextMenuCheckboxItemContent
            checked={showMiniMap}
            indicatorIcon={<CheckIcon className="size-3.5" />}
            onCheckedChange={setShowMiniMap}
          >
            <ListFilter className="size-4" />
            Show minimap
          </ContextMenuCheckboxItemContent>
          <ContextMenuCheckboxItemContent
            checked={wordWrap}
            indicatorPlacement="end"
            onCheckedChange={setWordWrap}
          >
            <WrapText className="size-4" />
            Enable word wrap
          </ContextMenuCheckboxItemContent>
        </ContextMenuGroup>

        <ContextMenuSeparator />

        <ContextMenuGroup>
          <ContextMenuLabel inset>Density</ContextMenuLabel>
          <ContextMenuRadioGroup onValueChange={setDensity} value={density}>
            <ContextMenuRadioItemContent value="compact">
              Compact
            </ContextMenuRadioItemContent>
            <ContextMenuRadioItemContent value="comfortable">
              Comfortable
            </ContextMenuRadioItemContent>
            <ContextMenuRadioItemContent
              indicatorPlacement="end"
              value="spacious"
            >
              Spacious
            </ContextMenuRadioItemContent>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
