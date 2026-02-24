"use client";

import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";
import { popupVariants, viewportVariants } from "./dialog";
import { cn } from "../../lib/utils";

function AlertDialog<Payload>(props: BaseAlertDialog.Root.Props<Payload>) {
  return <BaseAlertDialog.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger<Payload>({
  className,
  ...props
}: BaseAlertDialog.Trigger.Props<Payload>) {
  return (
    <BaseAlertDialog.Trigger<Payload>
      className={className}
      data-slot="alert-dialog-trigger"
      {...props}
    />
  );
}

function AlertDialogPortal({
  className,
  ...props
}: BaseAlertDialog.Portal.Props) {
  return (
    <BaseAlertDialog.Portal
      className={className}
      data-slot="alert-dialog-portal"
      {...props}
    />
  );
}

function AlertDialogBackdrop({
  className,
  ...props
}: BaseAlertDialog.Backdrop.Props) {
  return (
    <BaseAlertDialog.Backdrop
      className={cn(
        "fixed inset-0 min-h-dvh bg-black/20 backdrop-blur-xs animate-fade",
        "supports-[-webkit-touch-callout:none]:absolute",
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
}: BaseAlertDialog.Viewport.Props) {
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
}: BaseAlertDialog.Popup.Props) {
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
}: BaseAlertDialog.Title.Props) {
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
}: BaseAlertDialog.Description.Props) {
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
  ...props
}: BaseAlertDialog.Close.Props) {
  return (
    <BaseAlertDialog.Close
      className={className}
      data-slot="alert-dialog-close"
      {...props}
    />
  );
}

interface AlertDialogContentProps
  extends BaseAlertDialog.Popup.Props,
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
