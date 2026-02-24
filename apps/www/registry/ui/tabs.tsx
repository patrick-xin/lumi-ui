"use client";

import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { cn } from "@/registry/lib/utils";

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: BaseTabs.Root.Props) {
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

function TabsList({ className, children, ...props }: BaseTabs.List.Props) {
  return (
    <BaseTabs.List
      className={cn(
        "relative z-0 inline-flex",
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
function TabIndicator({ className, ...props }: BaseTabs.Indicator.Props) {
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

function TabsTab({ className, ...props }: BaseTabs.Tab.Props) {
  return (
    <BaseTabs.Tab
      className={cn(
        "relative flex z-1 items-center justify-center gap-1.5 select-none",
        "break-keep whitespace-nowrap h-[calc(100%-1px)]",
        "rounded-md px-2 py-1.5",
        "text-sm font-medium text-muted-foreground data-active:text-foreground",
        "transition-colors duration-200 ease-in",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "data-[orientation=horizontal]:flex-1 data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start",
        "relative before:absolute before:inset-x-0 before:inset-y-1.5 before:rounded-md",
        "focus-visible:outline focus-visible:outline-ring focus-visible:ring-4 focus-visible:ring-ring/10",
        className,
      )}
      data-slot="tabs-tab"
      {...props}
    />
  );
}

function TabsPanel({ className, ...props }: BaseTabs.Panel.Props) {
  return (
    <BaseTabs.Panel
      className={cn(
        "flex-1 rounded-md",
        "focus-visible:outline focus-visible:outline-ring focus-visible:ring-4 focus-visible:ring-ring/10",
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
}: BaseTabs.List.Props) {
  return (
    <BaseTabs.List
      className={cn(
        "relative z-0 inline-flex items-center rounded-md gap-1 px-1.5 bg-muted text-muted-foreground min-h-9",
        "data-[orientation=horizontal]:flex-row",
        "data-[orientation=vertical]:flex-col data-[orientation=vertical]:h-fit data-[orientation=vertical]:py-1.5",
        className,
      )}
      data-slot="tabs-list"
      {...props}
    >
      {children}
      <TabIndicator
        className={cn(
          "rounded-md bg-background dark:bg-accent",
          "top-1/2 -translate-y-1/2 left-0 data-[orientation=horizontal]:h-[calc(100%-8px)]",
          "data-[orientation=vertical]:left-1/2 data-[orientation=vertical]:-translate-x-1/2 data-[orientation=vertical]:top-0 data-[orientation=vertical]:translate-y-(--active-tab-top)",
        )}
        data-slot="tab-indicator"
      />
    </BaseTabs.List>
  );
}

export {
  Tabs,
  TabsList,
  TabsTab,
  TabsPanel,
  TabIndicator,
  // Composite component
  TabsListContent,
};
