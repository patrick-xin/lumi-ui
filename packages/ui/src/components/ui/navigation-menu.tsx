"use client";

import * as React from "react";
import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";
import { ArrowSvg } from "@lumi-ui/ui/arrow-svg";

import { cn } from "@lumi-ui/ui/lib/utils";

function NavigationMenuRoot({
  className,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Root>) {
  return (
    <BaseNavigationMenu.Root
      className={cn("relative max-w-max", className)}
      data-slot="navigation-menu-root"
      {...props}
    />
  );
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.List>) {
  return (
    <BaseNavigationMenu.List
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Item>) {
  return (
    <BaseNavigationMenu.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  );
}

const navigationMenuTriggerStyle = cva([
  "group inline-flex h-9 w-max items-center justify-center gap-1",
  "rounded-md bg-background px-4 py-2",
  "text-sm font-medium",
  "outline-none transition-[color,box-shadow]",
  "hover:bg-accent hover:text-accent-foreground",
  "focus:bg-accent focus:text-accent-foreground",
  "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-1",
  "disabled:pointer-events-none disabled:opacity-50",
  "data-[popup-open]:bg-accent/50 data-[popup-open]:text-accent-foreground",
  "data-[popup-open]:hover:bg-accent data-[popup-open]:focus:bg-accent",
]);

function NavigationMenuTrigger({
  className,
  children,
  showIcon = true,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Trigger> & {
  showIcon?: boolean;
}) {
  return (
    <BaseNavigationMenu.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), className)}
      {...props}
    >
      {children}
      {showIcon && (
        <NavigationMenuIcon>
          <ChevronDownIcon className="text-muted-foreground size-4 transition-transform duration-300 ease-in-out top-[1px] ml-1 group-data-[popup-open]:rotate-180" />
        </NavigationMenuIcon>
      )}
    </BaseNavigationMenu.Trigger>
  );
}

function NavigationMenuIcon({
  className,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Icon>) {
  return (
    <BaseNavigationMenu.Icon
      data-slot="navigation-menu-icon"
      className={cn(
        "transition-transform duration-200 ease-out",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Content>) {
  return (
    <BaseNavigationMenu.Content
      data-slot="navigation-menu-content"
      className={cn(
        "w-full p-2 md:w-auto",
        "animate-fade",
        "data-[starting-style]:data-[activation-direction=left]:translate-x-[-20%]",
        "data-[starting-style]:data-[activation-direction=right]:translate-x-[20%]",
        "data-[ending-style]:data-[activation-direction=left]:translate-x-[20%]",
        "data-[ending-style]:data-[activation-direction=right]:translate-x-[-20%]",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Link>) {
  return (
    <BaseNavigationMenu.Link
      data-slot="navigation-menu-link"
      className={cn(
        "flex flex-col gap-1 rounded-md p-2 text-sm",
        "outline-none transition-all",
        "[&_svg:not([class*='text-'])]:text-muted-foreground",
        "[&_svg:not([class*='size-'])]:size-4",
        "hover:bg-accent hover:text-accent-foreground",
        "focus:bg-accent focus:text-accent-foreground",
        "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-1",
        "data-[active]:bg-accent/50 data-[active]:text-accent-foreground",
        "data-[active]:hover:bg-accent data-[active]:focus:bg-accent",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuPortal(
  props: React.ComponentProps<typeof BaseNavigationMenu.Portal>,
) {
  return (
    <BaseNavigationMenu.Portal data-slot="navigation-menu-portal" {...props} />
  );
}

function NavigationMenuBackdrop({
  className,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Backdrop>) {
  return (
    <BaseNavigationMenu.Backdrop
      data-slot="navigation-menu-backdrop"
      className={cn(
        "fixed inset-0 bg-black/50 animate-fade",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuPositioner({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Positioner>) {
  return (
    <BaseNavigationMenu.Positioner
      data-slot="navigation-menu-positioner"
      className={cn(
        "h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)]",
        "transition-[top,left,right,bottom]",
        "data-[instant]:transition-none",
        "before:absolute before:content-['']",
        "data-[side=bottom]:before:top-[-10px] data-[side=bottom]:before:right-0 data-[side=bottom]:before:left-0 data-[side=bottom]:before:h-2.5 data-[side=left]:before:top-0 data-[side=left]:before:right-[-10px] data-[side=left]:before:bottom-0 data-[side=left]:before:w-2.5 data-[side=right]:before:top-0 data-[side=right]:before:bottom-0 data-[side=right]:before:left-[-10px] data-[side=right]:before:w-2.5 data-[side=top]:before:right-0 data-[side=top]:before:bottom-[-10px] data-[side=top]:before:left-0 data-[side=top]:before:h-2.5",
        className,
      )}
      {...props}
    >
      {children}
    </BaseNavigationMenu.Positioner>
  );
}

function NavigationMenuPopup(
  props: React.ComponentProps<typeof BaseNavigationMenu.Popup>,
) {
  return (
    <BaseNavigationMenu.Popup
      data-slot="navigation-menu-popup"
      className={cn(
        "h-[var(--popup-height)] w-[var(--popup-width)] xs:w-[var(--popup-width)]",
        "animate-fade"
      )}
      {...props}
    />
  );
}


function NavigationMenuArrow({
  className,
}: React.ComponentProps<typeof BaseNavigationMenu.Arrow>) {
  return (
    <BaseNavigationMenu.Arrow
      data-slot="navigation-menu-arrow"
      className={cn(
        "duration-[var(--duration)] ease-[var(--easing)]",
        "data-[side=bottom]:top-[-9px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180",
        className,
      )}
    >
      <ArrowSvg />
    </BaseNavigationMenu.Arrow>
  );
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Viewport>) {
  return (
    <BaseNavigationMenu.Viewport
      data-slot="navigation-menu-viewport"
      className={cn("relative h-full w-full overflow-hidden", className)}
      {...props}
    />
  );
}

function NavigationMenu({
  className,
  children,
  orientation = "horizontal",
  showArrow = false,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Root> & {
  showArrow?: boolean;
}) {
  return (
    <NavigationMenuRoot
      orientation={orientation}
      className="flex flex-1 items-center justify-center"
      {...props}
    >
      {children}
      <BaseNavigationMenu.Portal>
        <NavigationMenuPositioner
          sideOffset={10}
          collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }}
          collisionAvoidance={{ side: "none" }}
        >
          <NavigationMenuPopup 
            className={cn("relative rounded-md bg-popover text-popover-foreground",
             "outline outline-border dark:-outline-offset-1",
            className)}>
            {showArrow && <NavigationMenuArrow className="flex transition-[left]" />}
            <NavigationMenuViewport />
          </NavigationMenuPopup>
        </NavigationMenuPositioner>
      </BaseNavigationMenu.Portal>
    </NavigationMenuRoot>
  );
}

export {
  NavigationMenuRoot,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuViewport,
  NavigationMenuArrow,
  NavigationMenuBackdrop,
  NavigationMenuIcon,
  NavigationMenuPositioner,
  NavigationMenuPortal,
  NavigationMenuPopup,
  navigationMenuTriggerStyle,
  // Composite component
  NavigationMenu,
};
