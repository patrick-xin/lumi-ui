"use client";

import { Tabs as TabsPrimitive } from "@base-ui-components/react/tabs";
import type * as React from "react";

import { cn } from "@/lib/utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className="relative z-0 h-9 inline-flex gap-1 w-fit items-center justify-center text-muted-foreground p-[3px] rounded-md bg-muted"
      {...props}
    >
      {children}
      <TabIndicator />
    </TabsPrimitive.List>
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Tab>) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative z-[1] inline-flex flex-1 items-center justify-center gap-1.5",
        "rounded-md px-2 py-1 text-sm font-medium text-nowrap whitespace-nowrap",
        "text-muted-foreground outline-none transition-colors",
        "focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "data-[selected]:text-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function TabIndicator({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Indicator>) {
  return (
    <TabsPrimitive.Indicator
      data-slot="tab-indicator"
      className={cn(
        "absolute top-1/2 left-0 z-0 w-[var(--active-tab-width)] h-[var(--active-tab-height)]      rounded-md border border-ring/70 bg-input/70 shadow-sm dark:border-input",
        "translate-x-[var(--active-tab-left)] -translate-y-1/2 transition-all duration-300 ease-in-out",
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Panel>) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
