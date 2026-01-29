"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { buttonVariants } from "@lumi-ui/ui/button";
import { Separator } from "@lumi-ui/ui/separator";
import {
  ArrowDownFromLineIcon,
  ArrowUpFromLineIcon,
  ChevronDown,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type * as React from "react";
import { cn } from "@/lib/utils";

export function CodeCollapsibleWrapper({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Collapsible.Root
      render={(renderProps, state) => (
        <div
          {...renderProps}
          className={cn("group/collapsible relative", className)}
          {...props}
        >
          <div className="absolute top-2.5 right-10 z-50 flex items-center">
            <Collapsible.Trigger
              className={cn(
                buttonVariants({ size: "icon-xs", variant: "glow" }),
                "text-muted-foreground size-7",
              )}
            >
              {state.open ? (
                <ArrowUpFromLineIcon className="size-3.5" />
              ) : (
                <ArrowDownFromLineIcon className="size-3.5" />
              )}
            </Collapsible.Trigger>
            <Separator className="mx-1.5 h-5" orientation="vertical" />
          </div>
          <Collapsible.Panel
            keepMounted
            render={
              <motion.div
                animate={{ height: state.open ? "auto" : 256 }}
                className="relative mt-6 h-full overflow-hidden [&>figure]:mt-0 [&>figure]:md:mx-0"
                hidden={false}
                initial={false}
                transition={{ ease: [0.16, 1, 0.3, 1] }}
              >
                {children}

                <AnimatePresence>
                  {!state.open && (
                    <motion.div
                      animate={{ opacity: 1 }}
                      className="text-muted-foreground absolute inset-x-0 -bottom-2 flex h-24 items-center justify-center bg-linear-to-b from-transparent via-code/50 to-code"
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0 }}
                    >
                      <Collapsible.Trigger
                        className={buttonVariants({
                          size: "icon-sm",
                          variant: "secondary",
                        })}
                      >
                        <ChevronDown />
                      </Collapsible.Trigger>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            }
          />
        </div>
      )}
    />
  );
}
