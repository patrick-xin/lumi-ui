"use client";

import { mergeProps, useRender } from "@base-ui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { PanelLeftIcon, PanelRightIcon } from "lucide-react";
import type { ComponentProps, ReactNode, RefObject } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  type Layout,
  type PanelImperativeHandle,
  type PanelProps,
  usePanelRef,
} from "react-resizable-panels";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";
import {
  ResizableGroup,
  ResizablePanel,
  ResizableSeparator,
} from "@/registry/ui/resizable";
import { Separator } from "@/registry/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/ui/tooltip";

const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const LEFT_PANEL_ID = "left-panel";
const MAIN_PANEL_ID = "main-panel";
const RIGHT_PANEL_ID = "right-panel";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const LEFT_SIDEBAR_DEFAULT_WIDTH = "20%";
const LEFT_SIDEBAR_MAX_WIDTH = "28%";
const LEFT_SIDEBAR_MIN_WIDTH = "14%";
const MAIN_CONTENT_DEFAULT_WIDTH = "56%";
const MAIN_CONTENT_MIN_WIDTH = "40%";
const RIGHT_SIDEBAR_DEFAULT_WIDTH = "24%";
const RIGHT_SIDEBAR_MAX_WIDTH = "34%";
const RIGHT_SIDEBAR_MIN_WIDTH = "14%";
const SIDEBAR_ICON_COLLAPSED_WIDTH_PX = 64;
const COLLAPSED_PERCENTAGE_THRESHOLD = 10;
const SIDEBAR_RESIZE_BORDER_CLASS =
  "my-2 sm:my-4 bg-transparent focus-visible:bg-transparent data-[separator='active']:bg-transparent data-[separator='inactive']:bg-transparent";
type Collapsible = "icon" | "sidebar";

export type ThreeColumnLayout = Layout & {
  [key: string]: number;
};

interface SidebarContextType {
  collapsibleType?: Collapsible;
  collapsedSize: number | undefined;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  sidebarRef: RefObject<PanelImperativeHandle | null>;
  toggleSidebar: () => void;
  isMobile: boolean;
  isLeftCollapsed: boolean;
  isRightCollapsed: boolean;
  leftPanelRef: RefObject<PanelImperativeHandle | null>;
  rightPanelRef: RefObject<PanelImperativeHandle | null>;
  setIsLeftCollapsed: (collapsed: boolean) => void;
  setIsRightCollapsed: (collapsed: boolean) => void;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);
const SidebarPanelContext = createContext<
  { isCollapsed: boolean; side: "left" | "right" } | undefined
>(undefined);

function useThreeColumnSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error(
      "Sidebar components must be used inside this route's SidebarProvider.",
    );
  }

  return context;
}

const useSidebar = useThreeColumnSidebar;

function useSidebarPanel() {
  const context = useContext(SidebarPanelContext);

  if (!context) {
    return { isCollapsed: false, side: "left" as const };
  }

  return context;
}

interface SidebarProviderProps {
  children: ReactNode;
  defaultLayout?: ThreeColumnLayout;
  groupId: string;
  collapsibleType?: Collapsible;
  className?: string;
  header?: ReactNode;
}

function SidebarProvider({
  children,
  defaultLayout,
  groupId,
  collapsibleType = "icon",
  className,
  header,
}: SidebarProviderProps) {
  const isMobile = useIsMobile();
  const leftPanelRef = usePanelRef();
  const rightPanelRef = usePanelRef();
  const collapsedSize =
    collapsibleType === "icon" ? SIDEBAR_ICON_COLLAPSED_WIDTH_PX : 0;
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(() => {
    const leftPanelWidth = defaultLayout?.[LEFT_PANEL_ID];
    if (typeof leftPanelWidth !== "number") {
      return false;
    }

    return leftPanelWidth < COLLAPSED_PERCENTAGE_THRESHOLD;
  });
  const [isRightCollapsed, setIsRightCollapsed] = useState(() => {
    const rightPanelWidth = defaultLayout?.[RIGHT_PANEL_ID];
    if (typeof rightPanelWidth !== "number") {
      return false;
    }

    return rightPanelWidth < COLLAPSED_PERCENTAGE_THRESHOLD;
  });

  const toggleLeftSidebar = useCallback(() => {
    const panel = leftPanelRef.current;
    if (!panel) {
      return;
    }

    if (panel.isCollapsed()) {
      panel.expand();
      setIsLeftCollapsed(false);
      return;
    }

    panel.collapse();
    setIsLeftCollapsed(true);
  }, [leftPanelRef]);
  const toggleRightSidebar = useCallback(() => {
    const panel = rightPanelRef.current;
    if (!panel) {
      return;
    }

    if (panel.isCollapsed()) {
      panel.expand();
      setIsRightCollapsed(false);
      return;
    }

    panel.collapse();
    setIsRightCollapsed(true);
  }, [rightPanelRef]);

  const toggleSidebar = toggleLeftSidebar;

  useEffect(() => {
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

  if (isMobile) {
    return (
      <SidebarContext.Provider
        value={{
          collapsedSize,
          collapsibleType,
          isCollapsed: isLeftCollapsed,
          isLeftCollapsed,
          isMobile,
          isRightCollapsed,
          leftPanelRef,
          rightPanelRef,
          setIsCollapsed: setIsLeftCollapsed,
          setIsLeftCollapsed,
          setIsRightCollapsed,
          sidebarRef: leftPanelRef,
          toggleLeftSidebar,
          toggleRightSidebar,
          toggleSidebar,
        }}
      >
        <TooltipProvider>
          <div
            className={cn(
              "bg-muted/20 h-dvh w-full overflow-hidden flex flex-col",
              className,
            )}
          >
            {header ? <div className="shrink-0">{header}</div> : null}
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    );
  }

  return (
    <SidebarContext.Provider
      value={{
        collapsedSize,
        collapsibleType,
        isCollapsed: isLeftCollapsed,
        isLeftCollapsed,
        isMobile,
        isRightCollapsed,
        leftPanelRef,
        rightPanelRef,
        setIsCollapsed: setIsLeftCollapsed,
        setIsLeftCollapsed,
        setIsRightCollapsed,
        sidebarRef: leftPanelRef,
        toggleLeftSidebar,
        toggleRightSidebar,
        toggleSidebar,
      }}
    >
      <TooltipProvider>
        <div
          className={cn(
            "h-screen w-screen overflow-hidden flex flex-col",
            className,
          )}
        >
          {header ? <div className="shrink-0">{header}</div> : null}
          <div className="min-h-0 min-w-0 flex-1 overflow-hidden">
            <ResizableGroup
              className="min-w-0 overflow-hidden"
              data-slot="sidebar-wrapper"
              defaultLayout={defaultLayout}
              id={groupId}
              onLayoutChanged={(layout) => {
                document.cookie = `${groupId}=${encodeURIComponent(JSON.stringify(layout))}; Path=/; Max-Age=${SIDEBAR_COOKIE_MAX_AGE}; SameSite=Lax`;
              }}
              orientation="horizontal"
              resizeTargetMinimumSize={{ coarse: 37, fine: 27 }}
            >
              {children}
            </ResizableGroup>
          </div>
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

interface SidebarPanelProps extends Omit<PanelProps, "children" | "id"> {
  children: ReactNode;
  contentClassName?: string;
  mobileHidden?: boolean;
}

function Sidebar({
  children,
  className,
  contentClassName,
  defaultSize = LEFT_SIDEBAR_DEFAULT_WIDTH,
  maxSize = LEFT_SIDEBAR_MAX_WIDTH,
  minSize = LEFT_SIDEBAR_MIN_WIDTH,
  collapsible = true,
  collapsedSize,
  mobileHidden = true,
  ...props
}: SidebarPanelProps) {
  const {
    collapsedSize: providerCollapsedSize,
    collapsibleType,
    isLeftCollapsed,
    isMobile,
    leftPanelRef,
    setIsLeftCollapsed,
  } = useThreeColumnSidebar();
  const panelCollapsedSize = collapsedSize ?? providerCollapsedSize;

  if (isMobile) {
    if (mobileHidden) {
      return null;
    }

    return (
      <aside
        className={cn(
          "bg-sidebar text-sidebar-foreground flex min-h-0 h-full flex-col overflow-hidden",
          contentClassName,
        )}
      >
        {children}
      </aside>
    );
  }

  return (
    <>
      <ResizablePanel
        className={cn("min-w-0", className)}
        collapsedSize={panelCollapsedSize}
        collapsible={collapsible}
        data-side="left"
        data-state={isLeftCollapsed ? "collapsed" : "expanded"}
        defaultSize={defaultSize}
        id={LEFT_PANEL_ID}
        maxSize={maxSize}
        minSize={minSize}
        onResize={() => {
          const panelCollapsed = leftPanelRef.current?.isCollapsed() ?? false;
          if (panelCollapsed !== isLeftCollapsed) {
            setIsLeftCollapsed(panelCollapsed);
          }
        }}
        panelRef={leftPanelRef}
        {...props}
      >
        <SidebarPanelContext.Provider
          value={{ isCollapsed: isLeftCollapsed, side: "left" }}
        >
          <aside
            className={cn(
              "group bg-sidebar text-sidebar-foreground flex h-full min-h-0 min-w-0 flex-col overflow-hidden",
              contentClassName,
            )}
            data-collapsible={collapsibleType}
            data-slot="sidebar"
            data-state={isLeftCollapsed ? "collapsed" : "expanded"}
          >
            {children}
          </aside>
        </SidebarPanelContext.Provider>
      </ResizablePanel>
      <ResizableSeparator className={SIDEBAR_RESIZE_BORDER_CLASS} />
    </>
  );
}

function MainContent({
  children,
  className,
  defaultSize = MAIN_CONTENT_DEFAULT_WIDTH,
  minSize = MAIN_CONTENT_MIN_WIDTH,
  ...props
}: SidebarPanelProps) {
  const { isMobile } = useThreeColumnSidebar();

  if (isMobile) {
    return (
      <main className={cn("h-full min-h-0 overflow-hidden", className)}>
        {children}
      </main>
    );
  }

  return (
    <ResizablePanel
      className={cn("min-w-0 overflow-hidden", className)}
      data-slot="main-content"
      defaultSize={defaultSize}
      id={MAIN_PANEL_ID}
      minSize={minSize}
      {...props}
    >
      {children}
    </ResizablePanel>
  );
}

function RightSidebar({
  children,
  className,
  contentClassName,
  defaultSize = RIGHT_SIDEBAR_DEFAULT_WIDTH,
  maxSize = RIGHT_SIDEBAR_MAX_WIDTH,
  minSize = RIGHT_SIDEBAR_MIN_WIDTH,
  collapsible = true,
  collapsedSize,
  mobileHidden = true,
  ...props
}: SidebarPanelProps) {
  const {
    collapsedSize: providerCollapsedSize,
    collapsibleType,
    isMobile,
    isRightCollapsed,
    rightPanelRef,
    setIsRightCollapsed,
  } = useThreeColumnSidebar();
  const panelCollapsedSize = collapsedSize ?? providerCollapsedSize;

  if (isMobile) {
    if (mobileHidden) {
      return null;
    }

    return (
      <aside
        className={cn(
          "bg-sidebar text-sidebar-foreground flex min-h-0 h-full flex-col overflow-hidden",
          contentClassName,
        )}
      >
        {children}
      </aside>
    );
  }

  return (
    <>
      <ResizableSeparator className={SIDEBAR_RESIZE_BORDER_CLASS} />
      <ResizablePanel
        className={cn("min-w-0", className)}
        collapsedSize={panelCollapsedSize}
        collapsible={collapsible}
        data-side="right"
        data-state={isRightCollapsed ? "collapsed" : "expanded"}
        defaultSize={defaultSize}
        id={RIGHT_PANEL_ID}
        maxSize={maxSize}
        minSize={minSize}
        onResize={() => {
          const panelCollapsed = rightPanelRef.current?.isCollapsed() ?? false;
          if (panelCollapsed !== isRightCollapsed) {
            setIsRightCollapsed(panelCollapsed);
          }
        }}
        panelRef={rightPanelRef}
        {...props}
      >
        <SidebarPanelContext.Provider
          value={{ isCollapsed: isRightCollapsed, side: "right" }}
        >
          <aside
            className={cn(
              "group bg-sidebar text-sidebar-foreground flex h-full min-h-0 min-w-0 flex-col overflow-hidden",
              contentClassName,
            )}
            data-collapsible={collapsibleType}
            data-slot="sidebar"
            data-state={isRightCollapsed ? "collapsed" : "expanded"}
          >
            {children}
          </aside>
        </SidebarPanelContext.Provider>
      </ResizablePanel>
    </>
  );
}

const sidebarMenuButtonVariants = cva(
  [
    "relative peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md px-4 py-3 text-left transition-[width,height,padding,colors]",
    "[&>span:last-child]:truncate [&_svg]:size-4 [&_svg]:shrink-0",
    "group-data-[state=collapsed]:size-8 group-data-[state=collapsed]:p-2",
    "focus-visible:outline focus-visible:outline-ring focus-visible:ring-4 focus-visible:ring-ring/10",
    "data-[popup-open]:bg-accent",
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
        lg: "h-12 text-sm group-data-[state=collapsed]:p-0!",
        sm: "h-7 text-xs",
      },
      variant: {
        default: "hover:text-sidebar-accent-foreground hover:bg-sidebar-accent",
        outline:
          "bg-background hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      },
    },
  },
);

interface SidebarMenuButtonProps
  extends Omit<useRender.ComponentProps<"button">, "ref">,
    VariantProps<typeof sidebarMenuButtonVariants> {
  isActive?: boolean;
  tooltip?: string | ComponentProps<typeof TooltipContent>;
  ref?: React.Ref<HTMLElement>;
}

function SidebarMenuButton({
  render,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ref,
  ...props
}: SidebarMenuButtonProps) {
  const { isCollapsed } = useSidebarPanel();
  const { isMobile } = useSidebar();

  const element = useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(sidebarMenuButtonVariants({ size, variant }), className),
      },
      props,
    ),
    ref,
    render,
    state: {
      active: isActive,
      sidebar: "menu-button",
      size,
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
      <TooltipContent
        align="center"
        side="right"
        sideOffset={8}
        {...tooltipProps}
      />
    </Tooltip>
  );
}

function SidebarTrigger({
  className,
  children,
  onClick,
  side = "left",
  ...props
}: ComponentProps<typeof Button> & { side?: "left" | "right" }) {
  const {
    isLeftCollapsed,
    isRightCollapsed,
    toggleLeftSidebar,
    toggleRightSidebar,
  } = useSidebar();
  const isCollapsed = side === "right" ? isRightCollapsed : isLeftCollapsed;

  return (
    <Button
      className={cn("size-7 shrink-0", className)}
      data-side={side}
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      data-state={isCollapsed ? "collapsed" : "expanded"}
      onClick={(event) => {
        if (side === "right") {
          toggleRightSidebar();
        } else {
          toggleLeftSidebar();
        }
        onClick?.(event);
      }}
      size="icon"
      variant="ghost"
      {...props}
    >
      {children || (
        <>
          {side === "right" ? <PanelRightIcon /> : <PanelLeftIcon />}
          <span className="sr-only">Sidebar Trigger</span>
        </>
      )}
    </Button>
  );
}

function SidebarHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-2 p-2", className)}
      data-slot="sidebar-header"
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex min-h-0 min-w-0 flex-1 flex-col gap-2 overflow-x-hidden overflow-y-auto py-2",
        className,
      )}
      data-slot="sidebar-content"
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-2 p-2", className)}
      data-slot="sidebar-footer"
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative flex w-full min-w-0 p-2 flex-col first:pt-0",
        className,
      )}
      data-slot="sidebar-group"
      {...props}
    />
  );
}

function SidebarGroupContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("w-full text-sm", className)}
      data-slot="sidebar-group-content"
      {...props}
    />
  );
}

function SidebarGroupLabel({
  render,
  className,
  ...props
}: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "text-sidebar-foreground/70 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium transition-[margin,opacity] duration-200 ease-linear",
          "focus-visible:outline focus-visible:outline-ring focus-visible:ring-4 focus-visible:ring-ring/10",
          "[&>svg]:size-4 [&>svg]:shrink-0",
          "group-data-[state=collapsed]:-mt-8 group-data-[state=collapsed]:opacity-0",
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      slot: "sidebar-group-label",
    },
  });
}

function SidebarMenu({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      data-slot="sidebar-menu"
      {...props}
    />
  );
}

function SidebarMenuItem({ className, ...props }: ComponentProps<"li">) {
  return (
    <li
      className={cn("group/menu-item relative", className)}
      data-sidebar="menu-item"
      data-slot="sidebar-menu-item"
      {...props}
    />
  );
}

function SidebarMenuSub({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      className={cn(
        "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
        "group-data-[state=collapsed]:hidden",
        className,
      )}
      data-slot="sidebar-menu-sub"
      {...props}
    />
  );
}

function SidebarMenuSubItem({ className, ...props }: ComponentProps<"li">) {
  return (
    <li
      className={cn("group/menu-sub-item relative", className)}
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
          "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2",
          "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          "focus-visible:outline focus-visible:outline-ring focus-visible:ring-4 focus-visible:ring-ring/10",
          "active:bg-sidebar-accent active:text-sidebar-accent-foreground",
          "[&>svg]:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0 [&>span:last-child]:truncate",
          "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
          "data-[active]:bg-sidebar-accent data-[active]:text-sidebar-accent-foreground",
          size === "sm" && "text-xs",
          size === "md" && "text-sm",
          "group-data-[state=collapsed]:hidden",
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      active: isActive,
      size,
      slot: "sidebar-menu-sub-button",
    },
  });
}

interface SidebarMenuActionProps extends useRender.ComponentProps<"button"> {
  showOnHover?: boolean;
}

function SidebarMenuAction({
  render,
  className,
  showOnHover = false,
  ...props
}: SidebarMenuActionProps) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(
          "peer flex items-center justify-center absolute top-1.5 right-1 aspect-square w-5 rounded-md transition-transform text-sidebar-foreground hover:bg-accent",
          "[&>svg]:size-4 [&>svg]:shrink-0",
          "peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 after:absolute after:-inset-2 md:after:hidden ",
          "focus-visible:outline focus-visible:outline-ring focus-visible:ring-4 focus-visible:ring-ring/10",
          "data-[popup-open]:bg-accent",
          showOnHover &&
            "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[popup-open]:opacity-100 md:opacity-0",
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      sidebar: "menu-action",
      slot: "sidebar-menu-action",
    },
  });
}

function SidebarSeparator({
  className,
  ...props
}: ComponentProps<typeof Separator>) {
  return (
    <Separator
      className={cn("bg-sidebar-border w-auto", className)}
      data-slot="sidebar-separator"
      {...props}
    />
  );
}

function SidebarSection({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      className={cn("space-y-2", className)}
      data-slot="sidebar-section"
      {...props}
    />
  );
}

function InsetRoot({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("h-full p-2 sm:p-4", className)} {...props} />;
}

function InsetPanel({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-background flex h-full min-h-0 flex-col overflow-hidden rounded-xl border shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

function InsetHeader({ className, ...props }: ComponentProps<"header">) {
  return (
    <header
      className={cn(
        "bg-background/95 flex h-14 shrink-0 items-center gap-3 border-b px-4 backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}

function InsetContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("min-h-0 flex-1 overflow-y-auto", className)}
      {...props}
    />
  );
}

export {
  InsetContent,
  InsetHeader,
  InsetPanel,
  InsetRoot,
  MainContent,
  RightSidebar,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarSection,
  SidebarTrigger,
  useSidebar,
};
