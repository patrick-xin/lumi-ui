"use client";

import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/registry/lib/utils";
import { buttonVariants } from "@/registry/ui/button";

function Toolbar({ className, ...props }: BaseToolbar.Root.Props) {
  return (
    <BaseToolbar.Root
      className={cn(
        "bg-background flex h-10 w-full items-center gap-1 rounded-md border p-1 shadow-xs",
        className,
      )}
      data-slot="toolbar"
      {...props}
    />
  );
}

function ToolbarGroup({ className, ...props }: BaseToolbar.Group.Props) {
  return (
    <BaseToolbar.Group
      className={cn("flex items-center gap-1", className)}
      data-slot="toolbar-group"
      {...props}
    />
  );
}

function ToolbarButton({
  className,
  variant = "ghost",
  size = "sm",
  ...props
}: BaseToolbar.Button.Props & VariantProps<typeof buttonVariants>) {
  return (
    <BaseToolbar.Button
      className={cn(
        buttonVariants({ className, size, variant }),
        "data-[pressed]:bg-accent data-[pressed]:text-accent-foreground",
      )}
      data-slot="toolbar-button"
      {...props}
    />
  );
}

function ToolbarSeparator({
  className,
  ...props
}: BaseToolbar.Separator.Props) {
  return (
    <BaseToolbar.Separator
      className={cn("bg-border mx-1 h-5 w-[1px]", className)}
      data-slot="toolbar-separator"
      {...props}
    />
  );
}

function ToolbarLink({ className, ...props }: BaseToolbar.Link.Props) {
  return (
    <BaseToolbar.Link
      className={cn(
        "text-muted-foreground hover:text-foreground inline-flex items-center justify-center gap-2 rounded-md px-2.5 py-1.5 text-sm font-medium underline-offset-4 outline-none transition-colors hover:underline",
        "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      data-slot="toolbar-link"
      {...props}
    />
  );
}

function ToolbarInput({ className, ...props }: BaseToolbar.Input.Props) {
  return (
    <BaseToolbar.Input
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-8 w-[150px] rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      data-slot="toolbar-input"
      {...props}
    />
  );
}

export {
  Toolbar,
  ToolbarGroup,
  ToolbarButton,
  ToolbarSeparator,
  ToolbarLink,
  ToolbarInput,
};
