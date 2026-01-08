"use client";

import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const tabsListVariants = cva(
  "relative p-[3px] z-0 flex w-fit h-full items-center justify-center text-muted-foreground data-[orientation=vertical]:flex-col",
  {
    defaultVariants: {
      variant: "pill",
    },
    variants: {
      variant: {
        ghost: "gap-3 bg-transparent",
        pill: "gap-1 rounded-md bg-accent dark:bg-accent/50 text-accent-foreground data-[orientation=vertical]:py-1.5 data-[orientation=vertical]:px-1",
        solid:
          "gap-1 rounded-md bg-card data-[orientation=vertical]:gap-1.5 data-[orientation=vertical]:px-2 data-[orientation=vertical]:py-1.5",
        underline:
          "gap-4 p-0 bg-transparent border-b data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-l",
      },
    },
  },
);

const tabIndicatorVariants = cva(
  "absolute z-0 w-(--active-tab-width) h-(--active-tab-height) transition-all duration-300 ease-in-out translate-x-(--active-tab-left) -translate-y-(--active-tab-bottom)",
  {
    defaultVariants: {
      variant: "pill",
    },
    variants: {
      variant: {
        ghost:
          "bg-transparent top-1/2 -translate-y-1/2 left-0 translate-x-(--active-tab-left) data-[orientation=vertical]:left-1/2 data-[orientation=vertical]:-translate-x-1/2 data-[orientation=vertical]:top-0 data-[orientation=vertical]:translate-y-(--active-tab-top)",
        pill: "rounded-md bg-background dark:bg-accent top-1/2 -translate-y-1/2 left-0 data-[orientation=vertical]:left-1/2 data-[orientation=vertical]:-translate-x-1/2 data-[orientation=vertical]:top-0 data-[orientation=vertical]:translate-y-(--active-tab-top)",
        solid:
          "hidden pointer-events-none w-0 h-0 translate-x-0 -translate-y-0",
        underline:
          "bg-foreground bottom-0 left-0 h-0.5 translate-x-(--active-tab-left) translate-y-0 data-[orientation=vertical]:bottom-auto data-[orientation=vertical]:left-0 data-[orientation=vertical]:h-(--active-tab-height) data-[orientation=vertical]:w-0.5 data-[orientation=vertical]:translate-x-0 data-[orientation=vertical]:top-(--active-tab-top) data-[orientation=vertical]:translate-y-0 data-[orientation=vertical]:-start-[calc(--spacing(1)-0.5px)]",
      },
    },
  },
);

type TabsContextValue = {
  variant: VariantProps<typeof tabsListVariants>["variant"];
};

const TabsContext = React.createContext<TabsContextValue | undefined>(
  undefined,
);

function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within <Tabs>");
  }
  return context;
}

function Tabs({
  className,
  variant = "pill",
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof BaseTabs.Root> &
  VariantProps<typeof tabsListVariants> & {
    orientation?: "horizontal" | "vertical";
  }) {
  return (
    <TabsContext.Provider value={{ variant }}>
      <BaseTabs.Root
        className={cn(
          "flex gap-2 flex-col data-[orientation=vertical]:flex-row",
          className,
        )}
        data-slot="tabs"
        orientation={orientation}
        {...props}
      />
    </TabsContext.Provider>
  );
}

function TabsList({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseTabs.List>) {
  const { variant } = useTabsContext();

  return (
    <BaseTabs.List
      className={cn(
        tabsListVariants({ variant }),
        "data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col",
        className,
      )}
      data-slot="tabs-list"
      {...props}
    >
      {children}
      <TabIndicator />
    </BaseTabs.List>
  );
}

function TabsTab({
  className,
  ...props
}: React.ComponentProps<typeof BaseTabs.Tab>) {
  const { variant } = useTabsContext();

  return (
    <BaseTabs.Tab
      className={cn(
        "relative z-[1] inline-flex items-center justify-center gap-1.5 outline-none",
        "rounded-md px-2 py-1",
        "text-sm font-medium text-nowrap whitespace-nowrap text-muted-foreground hover:text-foreground",
        "transition-colors duration-200 ease-in",
        "focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "data-[active]:text-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "data-[orientation=horizontal]:flex-1 data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start",
        variant === "solid" && "hover:bg-accent data-[active]:bg-accent/70",
        variant === "ghost" && "data-[active]:text-foreground",
        className,
      )}
      data-slot="tabs-tab"
      {...props}
    />
  );
}

function TabIndicator({
  className,
  ...props
}: React.ComponentProps<typeof BaseTabs.Indicator>) {
  const { variant } = useTabsContext();

  return (
    <BaseTabs.Indicator
      className={cn(tabIndicatorVariants({ variant }), className)}
      data-slot="tab-indicator"
      {...props}
    />
  );
}

function TabsPanel({
  className,
  ...props
}: React.ComponentProps<typeof BaseTabs.Panel>) {
  return (
    <BaseTabs.Panel
      className={cn("flex-1 outline-none", className)}
      data-slot="tabs-panel"
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTab, TabsPanel };
