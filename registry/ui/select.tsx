"use client"

import * as React from "react"
import { Select as BaseSelect } from "@base-ui/react/select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Select<Value, Multiple extends boolean | undefined = false>(
  props: BaseSelect.Root.Props<Value, Multiple>,
): React.JSX.Element {
  return <BaseSelect.Root {...props} />;
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof BaseSelect.Group>) {
  return <BaseSelect.Group data-slot="select-group" {...props} />
}

function SelectValue({
  className,
  placeholder,
  children,
  ...props
}: React.ComponentProps<typeof BaseSelect.Value> & {
  placeholder?: string
}) {
  return (
    <BaseSelect.Value
      data-slot="select-value"
      data-placeholder-text={placeholder}
      className={cn(
        "data-[placeholder]:text-muted-foreground data-[placeholder]:before:content-[attr(data-placeholder-text)]",
        className
      )}
      {...props}
    >
      {children}
    </BaseSelect.Value>
  )
}

function SelectTrigger({
  className,
  children,
  size = "default",
  ...props
}: React.ComponentProps<typeof BaseSelect.Trigger> & {
  size?: "default" | "sm"
}) {
  return (
    <BaseSelect.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs outline-none",
        "dark:bg-input/30 dark:hover:bg-input/50",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "[&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "data-[size=default]:h-9 data-[size=sm]:h-8",
        "transition-[color,box-shadow]",
        "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
        className
      )}
      {...props}
    >
      {children}
      <BaseSelect.Icon>
        <ChevronDownIcon className="size-4 opacity-50" />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = "bottom",
  align = "start",
  sideOffset = 4,
  alignOffset = 0,
  position = "popper",
  ...props
}: React.ComponentProps<typeof BaseSelect.Popup> &
  Pick<
    React.ComponentProps<typeof BaseSelect.Positioner>,
    "side" | "sideOffset" | "align" | "alignOffset"
  > & {
    position?: "popper" | "item-aligned"
  }) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        alignItemWithTrigger={position === "item-aligned"}
        className="z-50 outline-none"
      >
        <BaseSelect.Popup
          data-slot="select-content"
          className={cn(
            "bg-popover text-popover-foreground relative overflow-hidden rounded-md border shadow-md min-w-[var(--anchor-width)]",
            "origin-[var(--transform-origin)] transition-[transform,scale,opacity] duration-150 ease-out",
            "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[ending-style]:transition-none",
            "data-[side=none]:transition-none data-[side=none]:data-[starting-style]:scale-100 data-[side=none]:data-[starting-style]:opacity-100",
            className
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <BaseSelect.List className="relative p-1 scroll-py-6 overflow-y-auto max-h-[min(24rem,var(--available-height))]">
            {children}
          </BaseSelect.List>
          <SelectScrollDownButton />
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof BaseSelect.GroupLabel>) {
  return (
    <BaseSelect.GroupLabel
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseSelect.Item>) {
  return (
    <BaseSelect.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        "[&_svg:not([class*='text-'])]:text-muted-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <BaseSelect.ItemIndicator>
          <CheckIcon className="size-4" />
        </BaseSelect.ItemIndicator>
      </span>
      <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
    </BaseSelect.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof BaseSelect.Separator>) {
  return (
    <BaseSelect.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof BaseSelect.ScrollUpArrow>) {
  return (
    <BaseSelect.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
       "top-0 z-1 flex h-7 w-full cursor-default items-center justify-center rounded-md bg-popover text-center text-xs before:absolute data-[side=none]:before:-top-full before:left-0 before:h-full before:w-full before:content-['']",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </BaseSelect.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof BaseSelect.ScrollDownArrow>) {
  return (
    <BaseSelect.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
       "bottom-0 z-1 flex h-7 w-full cursor-default items-center justify-center rounded-md bg-popover text-center text-xs before:absolute data-[side=none]:before:-bottom-full before:left-0 before:h-full before:w-full before:content-['']",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </BaseSelect.ScrollDownArrow>
  )
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}