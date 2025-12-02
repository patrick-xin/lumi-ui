"use client";

import {
  Toast,
  type ToastManagerAddOptions,
  type ToastManagerPromiseOptions,
} from "@base-ui-components/react/toast";
import type * as React from "react";

export interface BaseToastData {
  content?: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

export const toastManager = Toast.createToastManager();

export const useToast = Toast.useToastManager;

type ToastOptions<T extends object = BaseToastData> =
  ToastManagerAddOptions<T> & {
    title?: React.ReactNode;
    description?: React.ReactNode;
  };

export const toast = <T extends object = BaseToastData>(
  titleOrOptions: string | ToastOptions<T>,
  options?: ToastOptions<T>,
) => {
  if (typeof titleOrOptions === "string") {
    return toastManager.add({ title: titleOrOptions, ...options });
  }
  return toastManager.add(titleOrOptions);
};

toast.success = <T extends object = BaseToastData>(
  title: string,
  options?: ToastOptions<T>,
) => toastManager.add({ title, type: "success", ...options });

toast.error = <T extends object = BaseToastData>(
  title: string,
  options?: ToastOptions<T>,
) => toastManager.add({ title, type: "error", ...options });

toast.warning = <T extends object = BaseToastData>(
  title: string,
  options?: ToastOptions<T>,
) => toastManager.add({ title, type: "warning", ...options });

toast.info = <T extends object = BaseToastData>(
  title: string,
  options?: ToastOptions<T>,
) => toastManager.add({ title, type: "info", ...options });

toast.promise = <T, D extends object = BaseToastData>(
  promise: Promise<T>,
  options: ToastManagerPromiseOptions<T, D>,
) => toastManager.promise(promise, options);
