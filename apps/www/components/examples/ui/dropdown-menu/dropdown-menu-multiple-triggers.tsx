"use client";

import type { MenuRootChangeEventDetails } from "@base-ui/react";
import * as React from "react";
import { Button } from "@/registry/ui/button";
import {
  createDropdownMenuHandle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";

interface MenuItemDefinition {
  label: string;
  onClick?: () => void;
}

const MENUS = {
  library: [
    {
      label: "Add to library",
      onClick: () => console.log("Adding to library"),
    },
    {
      label: "Add to favorites",
      onClick: () => console.log("Adding to favorites"),
    },
  ] as MenuItemDefinition[],
  playback: [
    { label: "Play", onClick: () => console.log("Playing") },
    { label: "Add to queue", onClick: () => console.log("Adding to queue") },
  ] as MenuItemDefinition[],
  share: [
    { label: "Share", onClick: () => console.log("Sharing") },
    { label: "Copy link", onClick: () => console.log("Copying") },
  ] as MenuItemDefinition[],
};

type MenuKey = keyof typeof MENUS;

const demoMenu = createDropdownMenuHandle<MenuKey>();

export default function DropdownMenuMultipleTriggersDemo() {
  const [open, setOpen] = React.useState(false);
  const [activeTrigger, setActiveTrigger] = React.useState<string | null>(null);

  const handleOpenChange = (
    isOpen: boolean,
    eventDetails: MenuRootChangeEventDetails,
  ) => {
    setOpen(isOpen);
    if (isOpen) {
      setActiveTrigger(eventDetails.trigger?.id ?? null);
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-wrap items-center gap-2">
        <DropdownMenuTrigger
          handle={demoMenu}
          payload={"library" as const}
          id="menu-trigger-1"
          render={<Button variant="outline">Library</Button>}
        />
        <DropdownMenuTrigger
          handle={demoMenu}
          payload={"playback" as const}
          id="menu-trigger-2"
          render={<Button variant="outline">Playback</Button>}
        />
        <DropdownMenuTrigger
          handle={demoMenu}
          payload={"share" as const}
          id="menu-trigger-3"
          render={<Button variant="outline">Share</Button>}
        />
        <Button
          type="button"
          onClick={() => {
            setActiveTrigger("menu-trigger-2");
            setOpen(true);
          }}
        >
          Open playback (controlled)
        </Button>
      </div>
      <DropdownMenu
        handle={demoMenu}
        open={open}
        triggerId={activeTrigger}
        onOpenChange={handleOpenChange}
      >
        {({ payload }) => (
          <DropdownMenuContent matchAnchorWidth={false} showArrow>
            {payload &&
              MENUS[payload].map((item, index) => (
                <DropdownMenuItem key={index} onClick={item.onClick}>
                  {item.label}
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </React.Fragment>
  );
}
