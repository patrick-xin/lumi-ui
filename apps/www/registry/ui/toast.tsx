"use client";

import {
  Toast as BaseToast,
  type ToastManagerAddOptions,
  type ToastRootProps,
} from "@base-ui/react/toast";
import { cva } from "class-variance-authority";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  Loader2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/registry/ui/button";

const toastManager = BaseToast.createToastManager();

type ToastType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading"
  | "default";

type ToasterProps = {
  position?: ToastPosition;
  swipeDirection?: SwipePosition;
  limit?: number;
};

type SwipePosition = ToastRootProps["swipeDirection"];
type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

interface ToastProps extends BaseToast.Root.Props {
  type?: ToastType;
}

const Icons = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  loading: Loader2,
  default: null,
};

const toastVariants = cva(
  "toast-root absolute w-full rounded-sm p-4 outline outline-1 shadow-lg transition-all select-none bg-popover text-popover-foreground",
  {
    variants: {
      type: {
        default: "outline-border",
        success:
          "outline-green-500/40 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-50",
        error:
          "outline-red-500/40 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-50",
        warning:
          "outline-yellow-500/40 bg-yellow-50 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-50",
        info: "outline-blue-500/40 bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-50",
        loading: "outline-accent",
      },
    },
    defaultVariants: {
      type: "default",
    },
  },
);

export const toast = {
  add: (props: ToastManagerAddOptions<ToastProps>) => toastManager.add(props),
  success: (options?: ToastManagerAddOptions<ToastProps>) =>
    toastManager.add({ ...options, type: "success" }),
  error: (options?: ToastManagerAddOptions<ToastProps>) =>
    toastManager.add({ ...options, type: "error" }),
  warning: (options?: ToastManagerAddOptions<ToastProps>) =>
    toastManager.add({ ...options, type: "warning" }),
  info: (options?: ToastManagerAddOptions<ToastProps>) =>
    toastManager.add({ ...options, type: "info" }),
  promise: toastManager.promise,
  dismiss: toastManager.close,
  update: toastManager.update,
};

function Toaster({
  position = "bottom-right",
  swipeDirection = ["down", "right"],
  limit = 1,
}: ToasterProps) {
  return (
    <BaseToast.Provider toastManager={toastManager} limit={limit}>
      <Toast position={position} swipeDirection={swipeDirection} />
    </BaseToast.Provider>
  );
}

function Toast({
  position,
  swipeDirection,
}: {
  position: ToastPosition;
  swipeDirection: SwipePosition;
}) {
  const { toasts } = BaseToast.useToastManager();

  return (
    <BaseToast.Portal>
      <BaseToast.Viewport
        data-position={position}
        className={cn(
          "toast-viewport fixed z-10 flex flex-col w-[var(--toast-width)]",
          position.includes("right") && "items-end right-[var(--toast-inset)]",
          position.includes("left") && "items-start left-[var(--toast-inset)]",
          position.includes("center") &&
            "items-center left-1/2 -translate-x-1/2",
          position.includes("top") && "top-[var(--toast-inset)]",
          position.includes("bottom") && "bottom-[var(--toast-inset)]",
        )}
      >
        {toasts.map((toast) => {
          const type = (toast.type as ToastType) || "default";
          const Icon = Icons[type];

          return (
            <BaseToast.Root
              key={toast.id}
              toast={toast}
              data-position={position}
              swipeDirection={swipeDirection}
              className={cn(toastVariants({ type }))}
            >
              <BaseToast.Content className="flex items-start gap-3 overflow-hidden transition-opacity duration-250 data-[behind]:pointer-events-none data-[behind]:opacity-0 data-[expanded]:pointer-events-auto data-[expanded]:opacity-100">
                {Icon && (
                  <Icon
                    className={cn(
                      "size-5 mt-1 shrink-0",
                      type === "loading" && "animate-spin mt-0.5",
                    )}
                  />
                )}
                <div className="grid gap-1 flex-1">
                  {toast.title && (
                    <BaseToast.Title className="text-[0.975rem] font-semibold">
                      {toast.title}
                    </BaseToast.Title>
                  )}
                  {toast.description && (
                    <BaseToast.Description className="text-[0.925rem]">
                      {toast.description}
                    </BaseToast.Description>
                  )}

                  {toast.actionProps && (
                    <BaseToast.Action
                      className={cn(
                        buttonVariants({ size: "sm" }),
                        "mt-2.5 w-fit",
                      )}
                    >
                      {toast.actionProps.children}
                    </BaseToast.Action>
                  )}
                </div>
                <BaseToast.Close
                  aria-label="Close"
                  render={
                    <Button
                      className={cn(
                        "absolute top-1 right-1",
                        type === "error" && "hover:bg-red-500/20",
                        type === "success" && "hover:bg-green-500/20",
                        type === "warning" && "hover:bg-yellow-500/20",
                        type === "info" && "hover:bg-blue-500/20",
                      )}
                      variant={type === "default" ? "ghost" : "unstyled"}
                      size="icon-sm"
                    >
                      <X className="size-4" />
                    </Button>
                  }
                />
              </BaseToast.Content>
            </BaseToast.Root>
          );
        })}
      </BaseToast.Viewport>
    </BaseToast.Portal>
  );
}

export { Toaster };
