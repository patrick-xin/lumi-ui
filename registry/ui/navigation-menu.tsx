"use client"

import * as React from "react"
import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface NavigationMenuProps
  extends React.ComponentProps<typeof BaseNavigationMenu.Root> {
  viewport?: boolean
}

function NavigationMenu({
  className,
  children,
  viewport = true,
  orientation = "horizontal",
  ...props
}: NavigationMenuProps) {
  return (
    <BaseNavigationMenu.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      orientation={orientation}
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </BaseNavigationMenu.Root>
  )
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
        className
      )}
      {...props}
    />
  )
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
  )
}

const navigationMenuTriggerStyle = cva(
  [
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
  ]
)

interface NavigationMenuTriggerProps
  extends React.ComponentProps<typeof BaseNavigationMenu.Trigger> {
  showIcon?: boolean
}

function NavigationMenuTrigger({
  className,
  children,
  showIcon = true,
  ...props
}: NavigationMenuTriggerProps) {
  return (
    <BaseNavigationMenu.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), className)}
      {...props}
    >
      {children}
      {showIcon && (
        <BaseNavigationMenu.Icon>
          <ChevronDownIcon className="size-4 transition-transform duration-200 ease-in-out top-[1px] ml-1 group-data-[popup-open]:rotate-180"/>
        </BaseNavigationMenu.Icon>
      )}
    </BaseNavigationMenu.Trigger>
  )
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Content>) {
  return (
    <BaseNavigationMenu.Content
      data-slot="navigation-menu-content"
      className={cn(
        "w-full p-2 pr-2.5 md:w-auto",
        "transition-[opacity,transform] duration-200 ease-out",
        "data-[starting-style]:opacity-0",
        "data-[starting-style]:data-[activation-direction=left]:translate-x-[-12px]",
        "data-[starting-style]:data-[activation-direction=right]:translate-x-[12px]",
        "data-[ending-style]:opacity-0",
        "data-[ending-style]:data-[activation-direction=left]:translate-x-[12px]",
        "data-[ending-style]:data-[activation-direction=right]:translate-x-[-12px]",
        "group-data-[viewport=false]/navigation-menu:bg-popover",
        "group-data-[viewport=false]/navigation-menu:text-popover-foreground",
        "group-data-[viewport=false]/navigation-menu:absolute",
        "group-data-[viewport=false]/navigation-menu:top-full",
        "group-data-[viewport=false]/navigation-menu:left-0",
        "group-data-[viewport=false]/navigation-menu:mt-1.5",
        "group-data-[viewport=false]/navigation-menu:overflow-hidden",
        "group-data-[viewport=false]/navigation-menu:rounded-md",
        "group-data-[viewport=false]/navigation-menu:border",
        "group-data-[viewport=false]/navigation-menu:shadow",
        "**:data-[slot=navigation-menu-link]:focus:ring-0",
        "**:data-[slot=navigation-menu-link]:focus:outline-none",
        className
      )}
      {...props}
    />
  )
}

interface NavigationMenuViewportProps {
  className?: string
  sideOffset?: number
  arrow?: React.ReactNode | false
}

function NavigationMenuViewport({
  className,
  sideOffset = 6,
  arrow,
}: NavigationMenuViewportProps) {
  return (
    <BaseNavigationMenu.Portal>
      <BaseNavigationMenu.Positioner
        sideOffset={sideOffset}
        align="start"
        className={cn(
          "z-50",
          "transition-[top,left,right,bottom] duration-200 ease-out",
          "data-[instant]:transition-none"
        )}
      >
        <BaseNavigationMenu.Popup
          data-slot="navigation-menu-viewport"
          className={cn(
            "relative overflow-hidden",
            "rounded-md border bg-popover text-popover-foreground shadow-lg",
            "h-[var(--popup-height)] w-[var(--popup-width)]",
            "origin-[var(--transform-origin)]",
            "transition-[opacity,transform,width,height] duration-200 ease-out",
            "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
            className
          )}
        >
          {arrow !== false && (
            <NavigationMenuArrow>
              {arrow}
            </NavigationMenuArrow>
          )}
          <BaseNavigationMenu.Viewport className="relative h-full w-full overflow-hidden" />
        </BaseNavigationMenu.Popup>
      </BaseNavigationMenu.Positioner>
    </BaseNavigationMenu.Portal>
  )
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Link>) {
  return (
    <BaseNavigationMenu.Link
      data-slot="navigation-menu-link"
      className={cn(
        "flex flex-col gap-1 rounded-sm p-2 text-sm",
        "outline-none transition-all",
        "[&_svg:not([class*='text-'])]:text-muted-foreground",
        "[&_svg:not([class*='size-'])]:size-4",
        "hover:bg-accent hover:text-accent-foreground",
        "focus:bg-accent focus:text-accent-foreground",
        "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-1",
        "data-[active]:bg-accent/50 data-[active]:text-accent-foreground",
        "data-[active]:hover:bg-accent data-[active]:focus:bg-accent",
        className
      )}
      {...props}
    />
  )
}

interface NavigationMenuArrowProps {
  className?: string
  children?: React.ReactNode
}

function NavigationMenuArrow({ className, children }: NavigationMenuArrowProps) {
  return (
    <BaseNavigationMenu.Arrow
      data-slot="navigation-menu-arrow"
      className={cn(
        "z-[1] flex h-2 w-4 items-end justify-center overflow-hidden",
        "transition-[left] duration-200 ease-out",
        "data-[side=bottom]:-top-2",
        "data-[side=top]:-bottom-2 data-[side=top]:rotate-180",
        "data-[side=left]:-right-2 data-[side=left]:rotate-90",
        "data-[side=right]:-left-2 data-[side=right]:-rotate-90",
        className
      )}
    >
      {children ?? (
        <div className="relative top-[60%] h-2.5 w-2.5 rotate-45 rounded-tl-sm border-l border-t bg-popover shadow-sm" />
      )}
    </BaseNavigationMenu.Arrow>
  )
}

function NavigationMenuIndicator({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="navigation-menu-indicator"
      className={cn(
        "absolute bottom-0 left-0 z-[1] flex h-1 items-end justify-center overflow-hidden",
        "transition-[left,width] duration-200 ease-out",
        className
      )}
      {...props}
    >
      {children ?? (
        <div className="h-1 w-full rounded-t-full bg-primary" />
      )}
    </div>
  )
}

function NavigationMenuBackdrop({
  className,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Backdrop>) {
  return (
    <BaseNavigationMenu.Backdrop
      data-slot="navigation-menu-backdrop"
      className={cn(
        "fixed inset-0 z-40 bg-black/50",
        "transition-opacity duration-200",
        "data-[starting-style]:opacity-0",
        "data-[ending-style]:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuIcon({
  className,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Icon>) {
  return (
    <BaseNavigationMenu.Icon
      data-slot="navigation-menu-icon"
      className={cn(
        "transition-transform duration-200 ease-out data-[popup-open]:rotate-180",
        className
      )}
      {...props}
    />
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuViewport,
  NavigationMenuArrow,
  NavigationMenuIndicator,
  NavigationMenuBackdrop,
  NavigationMenuIcon,
  navigationMenuTriggerStyle,
}
