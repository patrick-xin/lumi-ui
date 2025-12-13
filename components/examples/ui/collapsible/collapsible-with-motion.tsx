"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/registry/ui/collapsible";

export function CollapsibleWithMotionDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-full max-w-sm">
      <CollapsibleTrigger
        render={
          <Button
            variant="ghost"
            className="w-full justify-start rounded-md rounded-b-none border border-b-0 hover:bg-transparent! cursor-pointer text-muted-foreground hover:text-foreground"
          >
            {open ? (
              <>
                <ChevronDown className="size-4" /> Collapse
              </>
            ) : (
              <>
                <ChevronRight className="size-4" /> Expand
              </>
            )}
          </Button>
        }
      />
      <CollapsiblePanel
        // disable default animation
        animation="none"
        keepMounted
        render={
          <motion.div
            hidden={false}
            initial={false}
            animate={{ height: open ? "auto" : 100 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
            className="relative overflow-hidden"
          >
            <div
              className={cn(
                "flex flex-col gap-4 border border-t-0 p-2 rounded-md rounded-t-none",
                open && "border-t-0",
              )}
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={String(i)}
                  className="flex h-12 w-full shrink-0 items-center justify-center rounded-md bg-accent/30"
                >
                  <span className="text-sm font-medium">{i + 1}</span>
                </div>
              ))}
            </div>

            <AnimatePresence>
              {!open && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none"
                />
              )}
            </AnimatePresence>
          </motion.div>
        }
      />
    </Collapsible>
  );
}
