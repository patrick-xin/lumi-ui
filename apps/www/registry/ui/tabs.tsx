"use client";

import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type * as React from "react";

import { cn } from "@/lib/utils";

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof BaseTabs.Root>) {
  return (
    <BaseTabs.Root
      className={cn(
        "flex gap-2 flex-col data-[orientation=vertical]:flex-row",
        className,
      )}
      data-slot="tabs"
      orientation={orientation}
      {...props}
    />
  );
}

function TabsList({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseTabs.List>) {
  return (
    <BaseTabs.List
      className={cn(
        "relative z-0 inline-flex p-1",
        "data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col",
        className,
      )}
      data-slot="tabs-list"
      {...props}
    >
      {children}
    </BaseTabs.List>
  );
}

function TabsTab({
  className,
  ...props
}: React.ComponentProps<typeof BaseTabs.Tab>) {
  return (
    <BaseTabs.Tab
      className={cn(
        "relative flex z-1 items-center justify-center gap-1.5 outline-none select-none",
        "break-keep whitespace-nowrap",
        "rounded-md px-2 py-1",
        "text-sm font-medium text-muted-foreground data-[active]:text-foreground",
        "transition-colors duration-200 ease-in",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "data-[orientation=horizontal]:flex-1 data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start",
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
  return (
    <BaseTabs.Indicator
      className={cn(
        "absolute z-0 w-(--active-tab-width) h-(--active-tab-height) transition-all duration-300 translate-x-(--active-tab-left) -translate-y-(--active-tab-bottom)",
        className,
      )}
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
      className={cn(
        "flex-1 outline-none",
        "focus-visible:border-ring/30 focus-visible:ring-2 focus-visible:ring-ring/10 focus-visible:ring-offset-2 focus-visible:ring-offset-ring/45",
        className,
      )}
      data-slot="tabs-panel"
      {...props}
    />
  );
}

function TabsListContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseTabs.List>) {
  return (
    <BaseTabs.List
      className={cn(
        "relative z-0 inline-flex p-1",
        "data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col",
        "rounded-sm bg-accent dark:bg-accent/50 text-accent-foreground data-[orientation=vertical]:h-48",
        className,
      )}
      data-slot="tabs-list"
      {...props}
    >
      {children}
     <TabIndicator data-slot="tab-indicator"  className="rounded-sm bg-primary/60 top-1/2 -translate-y-1/2 left-0 data-[orientation=vertical]:left-1/2 data-[orientation=vertical]:-translate-x-1/2 data-[orientation=vertical]:top-0 data-[orientation=vertical]:translate-y-(--active-tab-top)"/> 
    </BaseTabs.List>
  );
}

export { Tabs, TabsList, TabsTab, TabsPanel, TabIndicator,TabsListContent };
