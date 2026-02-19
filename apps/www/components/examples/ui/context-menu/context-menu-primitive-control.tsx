"use client";

import { ChevronRightIcon, Palette } from "lucide-react";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuPortal,
  ContextMenuPositioner,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/registry/ui/context-menu";

const primitiveItemClass =
  "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm outline-none select-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50 data-[disabled]:pointer-events-none";

export function ContextMenuPrimitiveControlDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[320px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click for primitive-level composition
      </ContextMenuTrigger>

      <ContextMenuPortal>
        <ContextMenuPositioner
          align="start"
          className="max-h-(--available-height)"
          sideOffset={8}
        >
          <ContextMenuPopup className="w-60 rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md outline outline-border/60 animate-popup">
            <ContextMenuItem className={primitiveItemClass} unstyled>
              Rename
            </ContextMenuItem>
            <ContextMenuItem className={primitiveItemClass} unstyled>
              Duplicate
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuSub>
              <ContextMenuSubTrigger
                className={`${primitiveItemClass} justify-between`}
              >
                Theme
                <ChevronRightIcon className="size-4 text-muted-foreground" />
              </ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-40">
                <ContextMenuItem className={primitiveItemClass} unstyled>
                  <Palette className="size-4" />
                  Ocean
                </ContextMenuItem>
                <ContextMenuItem className={primitiveItemClass} unstyled>
                  <Palette className="size-4" />
                  Forest
                </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
          </ContextMenuPopup>
        </ContextMenuPositioner>
      </ContextMenuPortal>
    </ContextMenu>
  );
}
