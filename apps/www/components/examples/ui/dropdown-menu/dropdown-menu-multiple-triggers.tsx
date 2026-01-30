"use client";

import type { MenuRootChangeEventDetails } from "@base-ui/react";
import { Button } from "@/registry/ui/button";
import {
  createDropdownMenuHandle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";
import * as React from "react";

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
          id="menu-trigger-1"
          payload={"library" as const}
          render={<Button variant="outline">Library</Button>}
        />
        <DropdownMenuTrigger
          handle={demoMenu}
          id="menu-trigger-2"
          payload={"playback" as const}
          render={<Button variant="outline">Playback</Button>}
        />
        <DropdownMenuTrigger
          handle={demoMenu}
          id="menu-trigger-3"
          payload={"share" as const}
          render={<Button variant="outline">Share</Button>}
        />
        <Button
          onClick={() => {
            setActiveTrigger("menu-trigger-2");
            setOpen(true);
          }}
          type="button"
        >
          Open playback (controlled)
        </Button>
      </div>
      <DropdownMenu
        handle={demoMenu}
        onOpenChange={handleOpenChange}
        open={open}
        triggerId={activeTrigger}
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
