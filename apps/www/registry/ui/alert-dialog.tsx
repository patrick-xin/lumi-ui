"use client";

import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/ui/button";

function AlertDialog<Payload>({
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Root<Payload>>) {
  return <BaseAlertDialog.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger<Payload>({
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Trigger<Payload>>) {
  return (
    <BaseAlertDialog.Trigger<Payload>
      data-slot="alert-dialog-trigger"
      {...props}
    />
  );
}

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Portal>) {
  return <BaseAlertDialog.Portal data-slot="alert-dialog-portal" {...props} />;
}

function AlertDialogBackdrop({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Backdrop>) {
  return (
    <BaseAlertDialog.Backdrop
      className={cn(
        "fixed inset-0 min-h-dvh supports-[-webkit-touch-callout:none]:absolute",
        "bg-black/70 animate-backdrop",
        className,
      )}
      data-slot="alert-dialog-backdrop"
      {...props}
    />
  );
}

function AlertDialogViewport({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Viewport>) {
  return (
    <BaseAlertDialog.Viewport
      className={cn("fixed inset-0 outline-none", className)}
      data-slot="alert-dialog-viewport"
      {...props}
    />
  );
}

function AlertDialogPopup({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Popup>) {
  return (
    <BaseAlertDialog.Popup
      className={cn("w-full p-4 sm:p-6", className)}
      data-slot="alert-dialog-popup"
      {...props}
    />
  );
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      data-slot="alert-dialog-header"
      {...props}
    />
  );
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Title>) {
  return (
    <BaseAlertDialog.Title
      className={cn("text-lg font-semibold", className)}
      data-slot="alert-dialog-title"
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Description>) {
  return (
    <BaseAlertDialog.Description
      className={cn("text-sm text-muted-foreground", className)}
      data-slot="alert-dialog-description"
      {...props}
    />
  );
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      data-slot="alert-dialog-footer"
      {...props}
    />
  );
}

function AlertDialogClose({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Close> &
  VariantProps<typeof buttonVariants>) {
  return (
    <BaseAlertDialog.Close
      className={cn(buttonVariants({ variant }), className)}
      data-slot="alert-dialog-close"
      {...props}
    />
  );
}

function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Popup>) {
  return (
    <AlertDialogPortal>
      <AlertDialogBackdrop />
      <AlertDialogViewport className="grid place-items-center">
        <AlertDialogPopup
          className={cn(
            "grid gap-4 w-full max-w-[calc(100vw-2rem)] sm:max-w-lg bg-background rounded animate-dialog",
            "outline outline-1 outline-border dark:-outline-offset-1",
            className,
          )}
          data-slot="alert-dialog-content"
          {...props}
        />
      </AlertDialogViewport>
    </AlertDialogPortal>
  );
}

function AlertDialogStackedContent({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Popup>) {
  return (
    <AlertDialogContent
      className={cn(
        "top-[calc(50%+1.25rem*var(--nested-dialogs))] scale-[calc(1-0.1*var(--nested-dialogs))]",
        "data-[nested-dialog-open]:after:absolute data-[nested-dialog-open]:after:inset-0 data-[nested-dialog-open]:after:rounded-[inherit] data-[nested-dialog-open]:after:bg-black/20",
        className,
      )}
      data-slot="alert-dialog-stacked-content"
      {...props}
    />
  );
}

const createAlertDialogHandle = BaseAlertDialog.createHandle;

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogBackdrop,
  AlertDialogViewport,
  AlertDialogPopup,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogClose,
  createAlertDialogHandle,
  // Composite component
  AlertDialogContent,
  AlertDialogStackedContent,
};
