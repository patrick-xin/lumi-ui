"use client";

import * as React from "react";
import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { popupVariants, viewportVariants } from "@/registry/ui/dialog";
import { buttonVariants } from "@/registry/ui/button";

import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";

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
        "fixed inset-0 min-h-dvh bg-black/20 backdrop-blur-xs animate-fade",
        "supports-[-webkit-touch-callout:none]:absolute",
        className
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
      className={cn("bg-background w-full p-4 sm:p-6", className)}
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
        className
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

interface AlertDialogContentProps
  extends React.ComponentProps<typeof BaseAlertDialog.Popup>,
    VariantProps<typeof popupVariants> {}

function AlertDialogContent({
  className,
  layout = "center",
  children,
  ...props
}: AlertDialogContentProps) {
  return (
    <AlertDialogPortal>
      <AlertDialogBackdrop />
      <AlertDialogViewport className={viewportVariants({ layout })}>
        <AlertDialogPopup
          className={cn(popupVariants({ layout }), className)}
          data-slot="alert-dialog-content"
          {...props}
        >
          {children}
        </AlertDialogPopup>
      </AlertDialogViewport>
    </AlertDialogPortal>
  );
}


const createAlertDialogHandle = BaseAlertDialog.createHandle;

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogViewport,
  AlertDialogBackdrop,
  AlertDialogPopup,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogClose,
  createAlertDialogHandle,
  // Composite component
  AlertDialogContent,
};
