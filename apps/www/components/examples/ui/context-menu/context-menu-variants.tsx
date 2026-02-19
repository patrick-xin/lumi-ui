"use client";

import { Flag, Slash, Trash2 } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTriggerGroup,
  ContextMenuTrigger,
} from "@/registry/ui/context-menu";

export function ContextMenuVariantsDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[320px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click to inspect item variants
      </ContextMenuTrigger>

      <ContextMenuContent className="w-60">
        <ContextMenuItem>
          <Flag className="size-4" />
          Mark as important
          <ContextMenuShortcut>⌘I</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuItem className="ml-1.5" variant="inset">
          Mute thread
          <ContextMenuShortcut>⌘M</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSub>
          <ContextMenuSubTriggerGroup className="ml-1.5" variant="inset">
            More actions
          </ContextMenuSubTriggerGroup>
          <ContextMenuSubContent className="w-44">
            <ContextMenuItem>
              <Slash className="size-4" />
              Block sender
            </ContextMenuItem>
            <ContextMenuItem disabled variant="inset">
              Restore defaults
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuSeparator />

        <ContextMenuItem variant="destructive">
          <Trash2 className="size-4" />
          Delete forever
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
