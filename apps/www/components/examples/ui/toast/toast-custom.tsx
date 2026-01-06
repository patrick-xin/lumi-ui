"use client";

import { X } from "lucide-react";
import { Button } from "@/registry/ui/button";
import {
  ToastClose,
  ToastDescription,
  ToastTitle,
  toast,
} from "@/registry/ui/toast";

export function ToastCustomDemo() {
  const createToast = () => {
    const id = toast.add({
      customContent: (
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-2xl p-4 shadow-2xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
          <div className="relative flex items-start gap-4">
            <div className="shrink-0" />
            <div className="flex-1">
              <ToastTitle className="text-lg font-bold text-white mb-1">
                Achievement Unlocked!
              </ToastTitle>
              <ToastDescription className="text-white/90">
                🎉 You've learned how to create custom toasts.
              </ToastDescription>
              <div className="mt-2 flex justify-between items-center">
                <ToastDescription className="text-white/90">
                  🌟 Star{" "}
                  <a
                    className="underline font-semibold"
                    href="https://github.com/patrick-xin/lumi-ui"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Lumi UI
                  </a>{" "}
                  on GitHub!
                </ToastDescription>
                <Button
                  onClick={() => {
                    toast.update(id, {
                      customContent: (
                        <div className="relative bg-emerald-700 dark:bg-emerald-900 border border-emerald-500 rounded-xl p-5 shadow-lg animate-popup transition-all duration-300">
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-xl" />
                          <div className="relative flex gap-4">
                            <div className="flex flex-col items-center justify-center bg-emerald-500/50 rounded-lg p-3 shadow-lg">
                              ✨
                            </div>
                            <div className="flex-1">
                              <ToastTitle className="text-lg font-semibold text-emerald-400 mb-1">
                                No worries!
                              </ToastTitle>
                              <ToastDescription className="text-emerald-100 text-sm">
                                You can always come back later!
                              </ToastDescription>
                            </div>
                            <ToastClose className="self-start size-6 p-1 text-emerald-400 hover:text-emerald-300 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30">
                              <X className="size-4 text-white" />
                            </ToastClose>
                          </div>
                        </div>
                      ),
                    });
                    toast.close(id);
                  }}
                  size="sm"
                >
                  No, thanks!
                </Button>
              </div>
            </div>
          </div>
        </div>
      ),
    });
  };
  return <Button onClick={createToast}>Unlock Achievement</Button>;
}
