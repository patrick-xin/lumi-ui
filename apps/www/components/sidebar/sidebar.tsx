"use client";

import { type Dialog, mergeProps, useRender } from "@base-ui/react";
import { Button } from "@lumi-ui/ui/button";
import { useIsMobile } from "@lumi-ui/ui/hooks/use-mobile";
import { cn } from "@lumi-ui/ui/lib/utils";
import {
  ResizableGroup,
  ResizablePanel,
  ResizableSeparator,
} from "@lumi-ui/ui/resizable";
import {
  createSheetHandle,
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@lumi-ui/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@lumi-ui/ui/tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import { PanelLeftIcon } from "lucide-react";
import React, { createContext, type ReactNode, useMemo, useState } from "react";
import {
  type Layout,
  type PanelImperativeHandle,
  usePanelRef,
} from "react-resizable-panels";

const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
type Collapsible = "icon" | "sidebar";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const ICON_MODE_WIDTH_PX = 48;
// If the percentage in the cookie is below this, we assume it's collapsed
const COLLAPSED_PERCENTAGE_THRESHOLD = 10;

interface SidebarContextType {
  collapsibleType?: Collapsible;
  toggleSidebar: () => void;
  sidebarRef: React.RefObject<PanelImperativeHandle | null>;
  isMobile: boolean;
  collapsedSize: number | undefined;
  mobileHandle: Dialog.Handle<unknown>;
  collapsedSizePixels: number;
  isCollapsed: boolean;
  setIsCollapsed: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

const SidebarProvider = ({
  collapsibleType = "icon",
  children,
  defaultLayout,
  groupId,
}: {
  children: ReactNode;
  collapsibleType?: Collapsible;
  defaultLayout: Layout | undefined;
  groupId: string;
}) => {
  const isMobile = useIsMobile();
  const sidebarRef = usePanelRef();
  const mobileHandle = useMemo(() => createSheetHandle(), []);
  const collapsedSize = () => {
    if (collapsibleType === "icon") return ICON_MODE_WIDTH_PX;
    if (collapsibleType === "sidebar") return 0;
  };
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // 1. If no cookie, default to expanded
    if (!defaultLayout || !defaultLayout.sidebar) return false;

    // 2. The cookie value is a percentage (0-100)
    const savedPercentage = defaultLayout.sidebar;

    // 3. Compare against our safety threshold
    return savedPercentage < COLLAPSED_PERCENTAGE_THRESHOLD;
  });

  const collapsedSizePixels = collapsibleType === "icon" ? 48 : 0;
  const toggleSidebar = React.useCallback(() => {
    const panel = sidebarRef.current;
    if (!panel) return;
    if (panel.isCollapsed()) {
      panel.expand();
    } else {
      panel.collapse();
    }
  }, [sidebarRef]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  return (
    <SidebarContext.Provider
      value={{
        collapsedSize: collapsedSize(),
        collapsedSizePixels,
        collapsibleType,
        isCollapsed,
        isMobile,
        mobileHandle,
        setIsCollapsed,
        sidebarRef,
        toggleSidebar,
      }}
    >
      <TooltipProvider>
        <div className="h-screen w-screen overflow-hidden">
          <ResizableGroup
            defaultLayout={defaultLayout}
            id={groupId}
            onLayoutChanged={(layout) => {
              document.cookie = `${groupId}=${JSON.stringify(layout)}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
            }}
            orientation="horizontal"
            resizeTargetMinimumSize={{ coarse: 37, fine: 27 }}
          >
            {children}
          </ResizableGroup>
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
};

const Sidebar = ({ children }: React.ComponentProps<"div">) => {
  const {
    collapsedSize,
    sidebarRef,
    mobileHandle,
    isMobile,
    isCollapsed,
    setIsCollapsed,
  } = useSidebar();

  if (isMobile)
    return (
      <Sheet handle={mobileHandle}>
        <SheetContent
          className="bg-sidebar text-sidebar-foreground w-72 p-0"
          side="left"
        >
          <div className="flex size-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  return (
    <>
      <ResizablePanel
        className={cn(
          "bg-sidebar relative h-full text-sidebar-foreground hidden md:flex flex-col overflow-hidden",
        )}
        collapsedSize={collapsedSize}
        collapsible
        defaultSize={"20rem"}
        id="sidebar"
        maxSize="24rem"
        minSize="16rem"
        onResize={(size) => {
          // size is PanelSize: { asPercentage: number, inPixels: number }
          // Always use inPixels for the boolean toggle to be precise
          const currentlyCollapsed = size.inPixels <= ICON_MODE_WIDTH_PX;
          if (currentlyCollapsed !== isCollapsed) {
            setIsCollapsed(currentlyCollapsed);
          }
        }}
        panelRef={sidebarRef}
      >
        {children}
      </ResizablePanel>

      <ResizableSeparator
        className={cn("hover:bg-primary/50 hidden md:block")}
      />
    </>
  );
};

const sidebarMenuButtonVariants = cva(
  [
    "flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left transition-[width,height,padding]",
    "[&>span:last-child]:truncate [&_svg]:size-4 [&_svg]:shrink-0 data-[collapsed]:size-8! data-[collapsed]:p-2!",
    "data-[active]:bg-sidebar-accent data-[active]:text-sidebar-accent-foreground",
  ],
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-8 text-sm",
        lg: "h-12 text-sm data-[collapsed]:p-0!",
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
}

function SidebarMenuButton({
  render,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: SidebarMenuButtonProps) {
  const { isMobile, isCollapsed } = useSidebar();

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
      collapsed: isCollapsed,
      sidebar: "menu-button",
      size: size,
      slot: "sidebar-menu-button",
    },
  });

  const shouldShowTooltip = tooltip && isCollapsed && !isMobile;

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

function SidebarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar, mobileHandle } = useSidebar();

  return (
    <SheetTrigger
      handle={mobileHandle}
      render={
        <Button
          className={cn("size-7", className)}
          data-sidebar="trigger"
          data-slot="sidebar-trigger"
          onClick={toggleSidebar}
          size="icon"
          variant="ghost"
          {...props}
        >
          <PanelLeftIcon />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      }
    />
  );
}

function SidebarInset({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <ResizablePanel
      className={cn(
        "bg-background relative flex w-full flex-1 flex-col overflow-y-auto",
        className,
      )}
      data-slot="sidebar-inset"
      id="main-content"
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-y-scroll",
        className,
      )}
      data-sidebar="content"
      data-slot="sidebar-content"
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      data-sidebar="menu"
      data-slot="sidebar-menu"
      {...props}
    />
  );
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      className={cn("group/menu-item relative", className)}
      data-sidebar="menu-item"
      data-slot="sidebar-menu-item"
      {...props}
    />
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-2 p-2", className)}
      data-sidebar="header"
      data-slot="sidebar-header"
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-2 p-2", className)}
      data-sidebar="footer"
      data-slot="sidebar-footer"
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      data-sidebar="group"
      data-slot="sidebar-group"
      {...props}
    />
  );
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("w-full text-sm", className)}
      data-sidebar="group-content"
      data-slot="sidebar-group-content"
      {...props}
    />
  );
}
export function SidebarGroupLabel({
  render,
  className,
  ...props
}: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium transition-[margin,opacity] duration-200 ease-linear focus-visible:outline focus-visible:outline-ring focus-visible:ring-4 focus-visible:ring-primary/10 [&>svg]:size-4 [&>svg]:shrink-0",
          "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      sidebar: "group-label",
      slot: "sidebar-group-label",
    },
  });
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn(
        "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      data-sidebar="menu-sub"
      data-slot="sidebar-menu-sub"
      {...props}
    />
  );
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      className={cn("group/menu-sub-item relative", className)}
      data-sidebar="menu-sub-item"
      data-slot="sidebar-menu-sub-item"
      {...props}
    />
  );
}

interface SidebarMenuSubButtonProps extends useRender.ComponentProps<"a"> {
  size?: "sm" | "md";
  isActive?: boolean;
}

function SidebarMenuSubButton({
  render,
  size = "md",
  isActive = false,
  className,
  ...props
}: SidebarMenuSubButtonProps) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(
          "text-sidebar-foreground focus-visible:outline focus-visible:outline-ring focus-visible:ring-4 focus-visible:ring-primary/10 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
          "data-[active]:bg-sidebar-accent data-[active]:text-sidebar-accent-foreground",
          size === "sm" && "text-xs",
          size === "md" && "text-sm",
          "group-data-[collapsible=icon]:hidden",
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      active: isActive,
      sidebar: "menu-sub-button",
      size: size,
      slot: "sidebar-menu-sub-button",
    },
  });
}

export {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarInset,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
};
