"use client";

import * as React from "react";
import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { buttonVariants } from "@/registry/ui/button";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

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
      data-slot="alert-dialog-backdrop"
      className={cn(
        "fixed inset-0 min-h-dvh bg-black/70 supports-backdrop-filter:backdrop-blur-xs animate-backdrop",
        "supports-[-webkit-touch-callout:none]:absolute",
        className,
      )}
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
      data-slot="alert-dialog-popup"
      className={cn(
        "relative bg-background p-4 sm:p-6",
        "animate-dialog",
        className,
      )}
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
      className={cn("fixed inset-0 p-4 sm:p-6 outline-none", className)}
      data-slot="alert-dialog-viewport"
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
        <BaseAlertDialog.Popup
          className={cn(
            "grid w-full max-w-lg gap-4 border bg-background p-4 shadow-lg rounded-lg animate-dialog",
            "scale-[calc(1-0.1*var(--nested-dialogs,0))]",
            "translate-y-[calc(-50%+1.25rem*var(--nested-dialogs,0))]",
            "data-[nested-dialog-open]:after:absolute data-[nested-dialog-open]:after:inset-0 data-[nested-dialog-open]:after:rounded-lg data-[nested-dialog-open]:after:bg-black/10",
            className
          )}
          {...props}
        />
      </AlertDialogViewport>
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
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
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
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
      data-slot="alert-dialog-title"
      className={cn("text-lg font-semibold", className)}
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
      data-slot="alert-dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
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
      data-slot="alert-dialog-close"
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  );
}

const createAlertDialogHandle = BaseAlertDialog.createHandle;

export {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  createAlertDialogHandle,
  // Composite component
  AlertDialogContent,
};
