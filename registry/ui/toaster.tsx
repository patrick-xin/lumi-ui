"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Loader2,
  XCircle,
} from "lucide-react";
import {
  toastManager,
  useToast,
  type BaseToastData
} from "@/hooks/use-toast";
import {
  Toast,
  ToastPortal,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/registry/ui/toast";
import { cn } from "@/lib/utils";

const TOAST_ICONS = {
  loading: <Loader2 className="size-4 animate-spin" />,
  success: <CheckCircle2 className="size-4 text-green-500" />,
  error: <XCircle className="size-4 text-red-500" />,
  warning: <AlertTriangle className="size-4 text-amber-500" />,
  info: <Info className="size-4 text-blue-500" />,
};

type ToasterProps = {
  position?: 
    | "top-left" 
    | "top-center" 
    | "top-right" 
    | "bottom-left" 
    | "bottom-center" 
    | "bottom-right";
};

export function Toaster({ position = "bottom-right" }: ToasterProps) {
  const stackDirection = position.startsWith("top") ? "top" : "bottom";
  const swipeDirection = stackDirection === "top" ? "up" : "down";

  return (
    <ToastProvider toastManager={toastManager}>
      <ToastPortal>
        <ToastViewport position={position}>
          <ToastList stack={stackDirection} swipeDirection={swipeDirection} />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  );
}

function ToastList({ 
  stack, 
  swipeDirection 
}: { 
  stack: "top" | "bottom", 
  swipeDirection: "up" | "down" 
}) {
  const { toasts } = useToast();

  return (
    <>
      {toasts.map((toast) => {
        const data = toast.data as BaseToastData | undefined;
        const customClassName = data?.className;
        const customContent = data?.content;

        return (
          <Toast 
            key={toast.id} 
            toast={toast}
            stack={stack}
            swipeDirection={["left", "right", swipeDirection]}
            className={cn(customClassName)}
          >
            <ToastContent>
              {customContent ? (
                <>
                  {customContent}
                  <ToastClose />
                </>
              ) : (
                <>
                  {toast.type && TOAST_ICONS[toast.type as keyof typeof TOAST_ICONS] && (
                    <div className="mt-0.5 shrink-0">
                      {TOAST_ICONS[toast.type as keyof typeof TOAST_ICONS]}
                    </div>
                  )}

                  <div className="grid gap-1 flex-1">
                    {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
                    {toast.description && (
                      <ToastDescription>{toast.description}</ToastDescription>
                    )}
                  </div>

                  {toast.actionProps && (
                    <ToastAction {...toast.actionProps} />
                  )}
                  <ToastClose />
                </>
              )}
            </ToastContent>
          </Toast>
        );
      })}
    </>
  );
}