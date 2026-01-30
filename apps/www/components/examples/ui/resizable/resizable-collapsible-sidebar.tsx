"use client";

import { useIsMobile } from "@/registry/hooks/use-mobile";
import { cn } from "@/registry/lib/utils";
import { Button } from "@/registry/ui/button";
import {
    ResizableGroup,
    ResizablePanel,
    ResizableSeparator,
} from "@/registry/ui/resizable";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/registry/ui/tooltip";
import { mergeProps, useRender } from "@base-ui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { SettingsIcon, UserIcon } from "lucide-react";
import { useState } from "react";
import { useDefaultLayout, usePanelRef } from "react-resizable-panels";

export const ResizableCollapsible = () => {
  const { defaultLayout, onLayoutChanged } = useDefaultLayout({
    id: "unique-layout-id",

    storage: sessionStorage,
  });
  const sidebarRef = usePanelRef();
  const [isOpen, setIsOpen] = useState(false);
  // Hide sidebar completely
  const [isCollapsable, setIsCollapsable] = useState(false);
  const toggleSidebar = () => {
    const panel = sidebarRef.current;
    if (panel) {
      if (isOpen) {
        panel.expand();
      } else {
        panel.collapse();
      }
    }
  };

  return (
    <ResizableGroup
      className="size-full"
      defaultLayout={defaultLayout}
      onLayoutChanged={onLayoutChanged}
      orientation="horizontal"
    >
      <ResizablePanel
        className="bg-sidebar"
        collapsedSize={isCollapsable ? 0 : 48}
        collapsible
        defaultSize="15%"
        maxSize="15%"
        // maxSize-minSize = 5% is for user to adjust panel width
        minSize="10%"
        onResize={() => {
          const panel = sidebarRef.current;
          if (panel) {
            // Check if the panel is currently reported as collapsed by the API
            const _isOpen = panel.isCollapsed();
            // Only update state if it changed to prevent re-render loops
            if (_isOpen !== isOpen) {
              setIsOpen(_isOpen);
            }
          }
        }}
        panelRef={sidebarRef}
      >
        {/* Sidebar Content */}
        <div className="flex flex-col items-center p-2 gap-2">
          <TooltipProvider>
            <SidebarMenuButton isOpen={isOpen} tooltip={"Profile"}>
              <UserIcon className="sise-4" /> Profile
            </SidebarMenuButton>
            <SidebarMenuButton isOpen={isOpen} tooltip={"Settings"}>
              <SettingsIcon className="sise-4" /> Settings
            </SidebarMenuButton>
          </TooltipProvider>
        </div>
      </ResizablePanel>

      <ResizableSeparator />

      <ResizablePanel defaultSize={50}>
        <div>
          <Button onClick={toggleSidebar}>
            {isOpen ? "Open Sidebar" : "Close Sidebar"}
          </Button>
          <Button onClick={() => setIsCollapsable(!isCollapsable)}>
            {isCollapsable ? "Collapsable" : "Not Collapsable"}
          </Button>
          Main Content
        </div>
      </ResizablePanel>
    </ResizableGroup>
  );
};

const sidebarMenuButtonVariants = cva(
  [
    "peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left transition-[width,height,padding]",
    "active:bg-sidebar-accent active:text-sidebar-accent-foreground",
    "focus-visible:outline focus-visible:outline-ring focus-visible:ring-4 focus-visible:ring-primary/10",
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
    "[&>span:last-child]:truncate [&_svg]:size-4 [&_svg]:shrink-0",
    "data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground data-active:font-medium",
    "data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground",
    "group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!",
    "group-has-[[data-popup-open]]/menu-item:bg-sidebar-accent group-has-[[data-popup-open]]/menu-item:text-sidebar-accent-foreground",
  ],
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-8 text-sm",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
        sm: "h-7 text-xs",
      },
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      },
    },
  },
);

interface SidebarMenuButtonProps
  extends useRender.ComponentProps<"button">,
    VariantProps<typeof sidebarMenuButtonVariants> {
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  isOpen: boolean;
}

function SidebarMenuButton({
  render,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  isOpen,
  ...props
}: SidebarMenuButtonProps) {
  const isMobile = useIsMobile();

  const element = useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(sidebarMenuButtonVariants({ size, variant }), className),
      },
      props,
    ),
    render,
    state: {
      active: isActive,
      sidebar: "menu-button",
      size: size,
      slot: "sidebar-menu-button",
    },
  });

  const shouldShowTooltip = tooltip && isOpen && !isMobile;

  if (!shouldShowTooltip) {
    return element;
  }

  const tooltipProps =
    typeof tooltip === "string" ? { children: tooltip } : tooltip;

  return (
    <Tooltip>
      <TooltipTrigger render={element} />
      <TooltipContent align="center" side="right" {...tooltipProps} />
    </Tooltip>
  );
}
