"use client";

import * as React from "react";
import { Toast as BaseToast } from "@base-ui-components/react/toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/ui/button";

const ToastProvider = BaseToast.Provider;

const ToastPortal = BaseToast.Portal;

const toastViewportVariants = cva(
  "fixed z-[100] flex w-[380px] max-w-[calc(100vw-2rem)] flex-col outline-none gap-2",
  {
    variants: {
      position: {
        "top-left": "top-4 left-4 sm:top-8 sm:left-8",
        "top-center": "top-4 left-1/2 -translate-x-1/2 sm:top-8",
        "top-right": "top-4 right-4 sm:top-8 sm:right-8",
        "bottom-left": "bottom-4 left-4 sm:bottom-8 sm:left-8",
        "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 sm:bottom-8",
        "bottom-right": "bottom-4 right-4 sm:bottom-8 sm:right-8",
      },
    },
    defaultVariants: {
      position: "bottom-right",
    },
  }
);

const ToastViewport = ({
  className,
  position,
  ...props
}: React.ComponentProps<typeof BaseToast.Viewport> & VariantProps<typeof toastViewportVariants>) => (
  <BaseToast.Viewport
    className={cn(
      "[--gap:0.75rem] [--peek:0.75rem]",
      toastViewportVariants({ position }),
      className
    )}
    {...props}
  />
);

const toastVariants = cva(
  "absolute w-full transition-all duration-300 ease-out flex flex-col rounded-lg border bg-background shadow-lg h-[var(--height)] z-[calc(100-var(--toast-index))]",
  {
    variants: {
      stack: {
        bottom: [
          "bottom-0 origin-bottom",
          "[--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]",
          "data-[starting-style]:translate-y-full", 
          "data-[ending-style]:data-[swipe-direction=down]:translate-y-full",
        ],
        top: [
          "top-0 origin-top",
          "[--offset-y:calc(var(--toast-offset-y)+(var(--toast-index)*var(--gap))+var(--toast-swipe-movement-y))]",
          "data-[starting-style]:-translate-y-full",
          "data-[ending-style]:data-[swipe-direction=up]:-translate-y-full",
        ],
      },
    },
    defaultVariants: {
      stack: "bottom",
    },
  }
);

const Toast = ({
  ref,
  className,
  stack,
  ...props
}: React.ComponentProps<typeof BaseToast.Root> & VariantProps<typeof toastVariants>) => {
  return (
    <BaseToast.Root
      ref={ref}
      className={cn(
        "[--scale:calc(max(0,1-(var(--toast-index)*0.1)))]",
        "[--shrink:calc(1-var(--scale))]",
        "[--height:var(--toast-frontmost-height,var(--toast-height))]",
        "after:absolute after:top-full after:left-0 after:w-full after:content-['']",
        "after:h-[calc(var(--gap)+1px)]",
        "translate-x-[var(--toast-swipe-movement-x)] translate-y-[calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height)))] scale-[var(--scale)]",
        "data-[expanded]:translate-y-[var(--offset-y)] data-[expanded]:scale-100",
        "data-[expanded]:h-[var(--toast-height)]",
        "data-[starting-style]:opacity-0",
        "data-[ending-style]:opacity-0 data-[ending-style]:scale-90",
        "data-[ending-style]:data-[swipe-direction=right]:translate-x-full",
        "data-[starting-style]:opacity-0",
        "data-[ending-style]:opacity-0 data-[ending-style]:scale-90",
        "data-[ending-style]:data-[swipe-direction=right]:translate-x-full",
        "data-[ending-style]:data-[swipe-direction=left]:-translate-x-full",
        toastVariants({ stack }),
        className
      )}
      {...props}
    />
  );
};

const ToastContent = ({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof BaseToast.Content>) => (
  <BaseToast.Content
    ref={ref}
    className={cn(
      "overflow-hidden transition-opacity duration-200",
      "data-[behind]:pointer-events-none data-[behind]:opacity-0",
      "data-[expanded]:pointer-events-auto data-[expanded]:opacity-100",
      "flex w-full items-start gap-3 p-4",
      className
    )}
    {...props}
  />
);

const ToastTitle = ({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof BaseToast.Title>) => (
  <BaseToast.Title
    ref={ref}
    className={cn("text-sm font-semibold leading-none tracking-tight", className)}
    {...props}
  />
);

const ToastDescription = ({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof BaseToast.Description>) => (
  <BaseToast.Description
    ref={ref}
    className={cn("text-sm opacity-90 leading-relaxed", className)}
    {...props}
  />
);

const ToastAction = ({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof BaseToast.Action>) => (
  <BaseToast.Action
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline", size: "sm" }),
      "shrink-0 h-7 px-3 text-xs font-medium transition-colors hover:bg-secondary focus:outline-none disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
);

const ToastClose = ({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof BaseToast.Close>) => (
  <BaseToast.Close
    ref={ref}
    aria-label="Close"
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100",
      className
    )}
    {...props}
  >
    <X className="size-4" />
  </BaseToast.Close>
);

export {
  ToastProvider,
  ToastPortal,
  ToastViewport,
  Toast,
  ToastContent,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
};