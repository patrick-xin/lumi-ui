"use client";

import { Tabs as TabsPrimitive } from "@base-ui-components/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const tabsListVariants = cva(
  "relative z-0 h-9 inline-flex gap-1 w-fit items-center justify-center text-muted-foreground p-[3px]",
  {
    variants: {
      variant: {
        pill: "rounded-md bg-muted",
        underline: "border-b bg-transparent p-0 gap-2",
        ghost: "bg-transparent p-0",
        solid: "bg-card rounded-md",
      },
    },
    defaultVariants: {
      variant: "pill",
    },
  },
);

const tabIndicatorVariants = cva(
  "absolute left-0 z-0 w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        pill: "top-1/2 -translate-y-1/2 h-[var(--active-tab-height)] rounded-md border border-ring/70 bg-input/70 shadow-sm dark:border-input",
        underline: "bottom-0 h-0.5 bg-primary",
        ghost:
          "top-1/2 -translate-y-1/2 h-[var(--active-tab-height)] bg-transparent",
        solid:
          "top-1/2 -translate-y-1/2 h-[var(--active-tab-height)] rounded-md bg-input/70 shadow-sm",
      },
    },
    defaultVariants: {
      variant: "pill",
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
  variant = "solid",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsContext.Provider value={{ variant }}>
      <TabsPrimitive.Root
        data-slot="tabs"
        className={cn("flex flex-col gap-2", className)}
        {...props}
      />
    </TabsContext.Provider>
  );
}

function TabsList({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const { variant } = useTabsContext();

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(tabsListVariants({ variant }), className)}
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
  const { variant } = useTabsContext();

  return (
    <TabsPrimitive.Indicator
      data-slot="tab-indicator"
      className={cn(tabIndicatorVariants({ variant }), className)}
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
