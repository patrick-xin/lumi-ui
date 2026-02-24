"use client";

import { Maximize2Icon, Minimize2Icon, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import { Button } from "@/registry/ui/button";
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
} from "@/registry/ui/dialog";
import { ScrollArea } from "@/registry/ui/scroll-area";

export function ExpandableDialog() {
  const [open, setOpen] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger render={<Button variant="glow">Open Dialog</Button>} />
      <AnimatePresence>
        {open && (
          <DialogPortal keepMounted>
            <DialogBackdrop />
            <DialogViewport className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
              <DialogPopup
                render={
                  <motion.div
                    animate={{
                      height: isExpanded ? "75vh" : "50vh",
                      maxWidth: isExpanded ? "56rem" : "40rem",
                      opacity: 1,
                      scale: 1,
                    }}
                    className="relative flex flex-col overflow-hidden rounded-md border bg-background shadow-lg"
                    exit={{ opacity: 0, scale: 0.95 }}
                    initial={{
                      height: "50vh",
                      maxWidth: "40rem",
                      opacity: 0,
                      scale: 0.95,
                    }}
                    layout
                    style={{
                      maxHeight: "90dvh",
                      width: "95vw",
                    }}
                    transition={{
                      bounce: 0,
                      damping: 30,
                      duration: 0.3,
                      stiffness: 300,
                      type: "spring",
                    }}
                  >
                    <DialogHeader className="flex flex-row items-center justify-between border-b p-2 sm:p-4">
                      <DialogTitle>Expandable Dialog</DialogTitle>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => setIsExpanded(!isExpanded)}
                          size="icon-sm"
                          title={isExpanded ? "Collapse" : "Expand"}
                          variant="ghost"
                        >
                          {isExpanded ? (
                            <Minimize2Icon className="size-4" />
                          ) : (
                            <Maximize2Icon className="size-4" />
                          )}
                          <span className="sr-only">Toggle expand</span>
                        </Button>
                        <DialogClose
                          render={
                            <Button size="icon-sm" variant="ghost">
                              <X className="size-4" />
                              <span className="sr-only">Close dialog</span>
                            </Button>
                          }
                          title="Close"
                        />
                      </div>
                    </DialogHeader>
                    <ScrollArea className="pr-1 min-h-0" gradientScrollFade>
                      <div className="space-y-4 p-2 sm:p-4">
                        {Array.from({ length: 30 }).map((_, i) => (
                          <div
                            className="flex items-center gap-4 rounded-md border border-border/50 h-26 bg-card p-3"
                            key={i}
                          >
                            <div className="h-10 w-10 shrink-0 rounded-full bg-muted" />
                            <div className="space-y-4">
                              <div className="h-6 w-24 sm:w-48 bg-muted rounded-md" />
                              <div className="h-6 w-32 sm:w-72 bg-muted rounded-md" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </motion.div>
                }
              />
            </DialogViewport>
          </DialogPortal>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
