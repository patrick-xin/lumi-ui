"use client";

import type {
  ToastManagerUpdateOptions,
  TooltipPositionerProps,
} from "@base-ui/react";
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
import { ArrowSvg } from "@/registry/ui/arrow-svg";
import { buttonVariants } from "@/registry/ui/button";

const stackedManager = BaseToast.createToastManager();
const anchoredManager = BaseToast.createToastManager();

type ToastType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading"
  | "default";

type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

type SwipePosition = ToastRootProps["swipeDirection"];

type ToasterProps = {
  position?: ToastPosition;
  swipeDirection?: SwipePosition;
  limit?: number;
};

interface ToastData {
  closable?: boolean;
  customContent?: React.ReactNode;
}

interface ToastProps extends BaseToast.Root.Props {
  type?: ToastType;
  data?: ToastData;
}

type ToastOptions = ToastManagerAddOptions<ToastProps> & ToastData;
type ToastUpdateOptions = ToastManagerUpdateOptions<ToastProps> & ToastData;

const Icons = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  loading: Loader2,
  default: null,
};

const toastVariants = cva(
  // Custom styles, change the look of the toast
  "rounded-md outline-1 shadow-lg transition-all select-none dark:-outline-offset-1",
  {
    variants: {
      type: {
        default: "outline-border bg-popover text-popover-foreground",
        success:
          "outline-green-500/40 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-200",
        error:
          "outline-red-500/40 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-200",
        warning:
          "outline-yellow-500/40 bg-yellow-50 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-200",
        info: "outline-sky-500/40 bg-sky-50 text-sky-900 dark:bg-sky-950 dark:text-sky-200",
        loading: "outline-border bg-popover text-popover-foreground",
      },
    },
    defaultVariants: {
      type: "default",
    },
  },
);

const getOptions = (options?: ToastOptions) => {
  const { customContent, closable, data, ...rest } = options || {};
  return {
    ...rest,
    data: { ...data, customContent, closable },
  };
};

const toast = {
  add: (options: ToastOptions) => stackedManager.add(getOptions(options)),
  success: (options?: ToastOptions) =>
    stackedManager.add({ ...getOptions(options), type: "success" }),
  error: (options?: ToastOptions) =>
    stackedManager.add({ ...getOptions(options), type: "error" }),
  warning: (options?: ToastOptions) =>
    stackedManager.add({ ...getOptions(options), type: "warning" }),
  info: (options?: ToastOptions) =>
    stackedManager.add({ ...getOptions(options), type: "info" }),
  promise: <Value,>(
    promise: Promise<Value>, 
    options: {
      loading: ToastOptions | string;
      success: ToastOptions | string | ((value: Value) => ToastOptions | string);
      error: ToastOptions | string | ((error: Error) => ToastOptions | string);
    }
  ) => {
    const normalize = (opt: ToastOptions | string) => 
      typeof opt === "string" ? { title: opt } : getOptions(opt);

    return stackedManager.promise(promise, {
      loading: normalize(options.loading),
      success: (val) => {
        const resolved = typeof options.success === "function" ? options.success(val) : options.success;
        return normalize(resolved);
      },
      error: (err) => {
        const resolved = typeof options.error === "function" ? options.error(err) : options.error;
        return normalize(resolved);
      }
    });
  },
  update: (id: string, options?: ToastUpdateOptions) =>
    stackedManager.update(id, getOptions(options)),
  close: (id: string) => {
    stackedManager.close(id);
    anchoredManager.close(id);
  },
  anchor: (
    anchor: HTMLElement | null,
    options?: Omit<ToastOptions, "positionerProps"> & {
      sideOffset?: TooltipPositionerProps["sideOffset"];
      side?: TooltipPositionerProps["side"];
    },
  ) => {
    if (!anchor) return "";
    const { sideOffset, side, ...rest } = options || {};
    const normalized = getOptions(rest);
    return anchoredManager.add({
      ...normalized,
      positionerProps: {
        anchor,
        sideOffset: sideOffset ?? 8,
        side: side ?? "bottom",
      },
    });
  },
};

const ToastViewport = ({ ...props }: BaseToast.Viewport.Props) => {
  return <BaseToast.Viewport data-slot="toast-viewport" {...props} />;
};

const ToastContent = ({ children, ...props }: BaseToast.Content.Props) => {
  return (
    <BaseToast.Content data-slot="toast-content" {...props}>
      {children}
    </BaseToast.Content>
  );
};

const ToastTitle = ({ children, ...props }: BaseToast.Title.Props) => {
  return (
    <BaseToast.Title
      data-slot="toast-title"
      className="text-sm font-semibold"
      {...props}
    >
      {children}
    </BaseToast.Title>
  );
};

const ToastDescription = ({
  children,
  ...props
}: BaseToast.Description.Props) => {
  return (
    <BaseToast.Description
      data-slot="toast-description"
      className="text-sm"
      {...props}
    >
      {children}
    </BaseToast.Description>
  );
};

const ToastClose = ({ children, ...props }: BaseToast.Close.Props) => {
  return (
    <BaseToast.Close data-slot="toast-close" aria-label="Close" {...props}>
      {children}
    </BaseToast.Close>
  );
};

const ToastAction = (props: BaseToast.Action.Props) => {
  return <BaseToast.Action data-slot="toast-action" {...props} />;
};

const ToastArrow = (props: BaseToast.Arrow.Props) => {
  return (
    <BaseToast.Arrow
      data-slot="toast-arrow"
      className="data-[side=bottom]:-top-2 data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:-bottom-2 data-[side=top]:rotate-180"
      {...props}
    >
      <ArrowSvg />
    </BaseToast.Arrow>
  );
};

const Toaster = ({
  position = "bottom-right",
  swipeDirection = ["down", "right"],
  limit = 3,
}: ToasterProps) => {
  return (
    <>
      <BaseToast.Provider toastManager={stackedManager} limit={limit}>
        <StackedToast position={position} swipeDirection={swipeDirection} />
      </BaseToast.Provider>
      <BaseToast.Provider toastManager={anchoredManager}>
        <AnchoredToast />
      </BaseToast.Provider>
    </>
  );
};

const StackedToast = ({
  position,
  swipeDirection,
}: {
  position: ToastPosition;
  swipeDirection: SwipePosition;
}) => {
  const { toasts } = BaseToast.useToastManager();
  return (
    <BaseToast.Portal>
      <ToastViewport
        data-position={position}
        className="toast-viewport"
      >
        {toasts.map((toast) => {
          const toastType = (toast.type as ToastType) || "default";
          const Icon = Icons[toastType];
          const isCustomContent = toast.data?.customContent;

          return (
            <BaseToast.Root
              data-slot="toast-root"
              key={toast.id}
              toast={toast}
              data-position={position}
              swipeDirection={swipeDirection}
              className={cn(
                "toast-root",
                !isCustomContent && toastVariants({ type: toastType }),
              )}
            >
              <ToastContent
                className={cn(
                  "overflow-hidden transition-opacity duration-250 select-none",
                  "data-[behind]:pointer-events-none data-[behind]:opacity-0 data-[expanded]:pointer-events-auto data-[expanded]:opacity-100",
                )}
              >
                {isCustomContent ? (
                  toast.data.customContent
                ) : (
                  <div className="flex items-center gap-3 p-4">
                    {Icon && (
                      <Icon
                        data-slot="toast-icon"
                        className={cn(
                          "size-5 shrink-0",
                          toastType === "loading" && "animate-spin",
                        )}
                      />
                    )}
                    <div className="flex justify-between items-center flex-wrap flex-1">
                      <div className="space-y-1">
                        {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
                        {toast.description && (
                          <ToastDescription>
                            {toast.description}
                          </ToastDescription>
                        )}
                      </div>
                      {toast.actionProps && (
                        <ToastAction
                          className={cn(
                            buttonVariants({ size: "sm" }),
                            "w-fit",
                          )}
                        >
                          {toast.actionProps.children}
                        </ToastAction>
                      )}
                      {toast.data?.closable && (
                        <ToastClose
                          className={cn(
                            buttonVariants({
                              variant: "ghost",
                              size: "icon-sm",
                            }),
                            "absolute top-1 right-1 size-6",
                            toastType === "error" && "hover:bg-red-500/20!",
                            toastType === "success" && "hover:bg-green-500/20!",
                            toastType === "warning" &&
                              "hover:bg-yellow-500/20!",
                            toastType === "info" && "hover:bg-blue-500/20!",
                          )}
                        >
                          <X className="size-4" />
                        </ToastClose>
                      )}
                    </div>
                  </div>
                )}
              </ToastContent>
            </BaseToast.Root>
          );
        })}
      </ToastViewport>
    </BaseToast.Portal>
  );
};

const AnchoredToast = () => {
  const { toasts } = BaseToast.useToastManager();

  return (
    <BaseToast.Portal>
      <ToastViewport className="fixed inset-0 pointer-events-none">
        {toasts.map((toast) => {
          const isCustomContent = toast.data?.customContent;
          return (
            <BaseToast.Positioner
              data-slot="toast-positioner"
              key={toast.id}
              toast={toast}
              className="outline-none"
            >
              <BaseToast.Root
                data-slot="toast-root"
                toast={toast}
                className={cn(
                  !isCustomContent && toastVariants({ type: "default" }),
                  "animate-popup",
                )}
              >
                {isCustomContent ? (
                  toast.data.customContent
                ) : (
                  <>
                    <ToastArrow />
                    <ToastContent className="flex flex-col py-2 px-3 gap-2">
                      {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
                      {toast.description && (
                        <ToastDescription>{toast.description}</ToastDescription>
                      )}
                    </ToastContent>
                  </>
                )}
              </BaseToast.Root>
            </BaseToast.Positioner>
          );
        })}
      </ToastViewport>
    </BaseToast.Portal>
  );
};

export {
  Toaster,
  ToastClose,
  ToastDescription,
  ToastTitle,
  ToastAction,
  ToastArrow,
  toast,
};
