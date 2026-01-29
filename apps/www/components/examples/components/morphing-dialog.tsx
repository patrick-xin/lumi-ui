"use client";

import type { DialogRootActions } from "@base-ui/react/dialog";
import { Button } from "@lumi-ui/ui/button";
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogViewport,
} from "@lumi-ui/ui/dialog";
import { ScrollArea } from "@lumi-ui/ui/scroll-area";
import { PlusIcon, X } from "lucide-react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";

export function MorphingDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<(typeof ITEMS)[0] | null>(null);

  const actionsRef = useRef<DialogRootActions>({
    close: () => {},
    unmount: () => {},
  });

  const handleOpen = (item: (typeof ITEMS)[0]) => {
    setActiveItem(item);
    setIsOpen(true);
  };

  const handleClose = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <div>
      <LayoutGroup>
        <ScrollArea
          className="w-screen whitespace-nowrap container"
          noScrollBar
        >
          <div className="flex gap-2 md:gap-6 lg:gap-10 mx-auto">
            {ITEMS.map((item) => (
              <motion.button
                className="relative group flex flex-col cursor-pointer bg-muted hover:bg-muted/80 transition-colors flex-1 size-64 lg:size-80 rounded focus-visible:outline focus-visible:outline-ring focus-visible:ring-4 focus-visible:ring-primary/10"
                key={item.id}
                layoutId={`card-container-${item.id}`}
                onClick={() => handleOpen(item)}
                style={{
                  opacity: activeItem?.id === item.id && isOpen ? 0 : 1,
                  pointerEvents:
                    activeItem?.id === item.id && isOpen ? "none" : "auto",
                }}
              >
                <div className="relative h-48 w-full overflow-hidden rounded rounded-b-none">
                  <motion.div
                    className="w-full h-full"
                    layoutId={`image-container-${item.id}`}
                  >
                    <Image
                      alt={item.title}
                      className="h-full w-full object-cover dark:brightness-20 dark:grayscale-25"
                      height={500}
                      src={item.image}
                      width={500}
                    />
                  </motion.div>
                </div>
                <div className="flex flex-1 p-4 justify-between items-center rounded rounded-t-none">
                  <motion.h3
                    className="text-lg font-semibold"
                    layoutId={`title-${item.id}`}
                    transition={{ duration: 0.2 }}
                  >
                    {item.title}
                  </motion.h3>

                  <PlusIcon className="group-hover:text-foreground text-muted-foreground transition-all" />
                </div>
              </motion.button>
            ))}
          </div>
        </ScrollArea>
        <Dialog
          actionsRef={actionsRef}
          onOpenChange={handleClose}
          open={isOpen}
        >
          <AnimatePresence mode="popLayout">
            {isOpen && activeItem && (
              <DialogPortal keepMounted>
                <DialogBackdrop />
                <DialogViewport
                  className="grid place-items-center p-4 pt-32"
                  hidden={false}
                >
                  <DialogPopup
                    className="relative w-full max-w-4xl flex flex-col overflow-hidden rounded"
                    hidden={false}
                    render={
                      <motion.div
                        layoutId={`card-container-${activeItem.id}`}
                        onLayoutAnimationComplete={() => {
                          if (!isOpen) {
                            actionsRef.current?.unmount();
                            setTimeout(() => setActiveItem(null), 50);
                          }
                        }}
                      />
                    }
                  >
                    <ScrollArea className="h-[calc(100vh-4rem)]" noScrollBar>
                      <motion.div
                        animate={{ opacity: 1 }}
                        className="flex flex-col h-full"
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                        transition={{
                          duration: 0.15,
                        }}
                      >
                        <div className="relative h-64 sm:h-96 w-full shrink-0 overflow-hidden">
                          <motion.div
                            className="w-full h-full"
                            layoutId={`image-container-${activeItem.id}`}
                          >
                            <Image
                              alt={activeItem.title}
                              className="h-full w-full object-cover dark:brightness-20 dark:grayscale-25"
                              height={500}
                              src={activeItem.image}
                              width={500}
                            />
                          </motion.div>
                        </div>

                        <div className="flex flex-col p-4 sm:p-8 justify-start text-left space-y-6">
                          <DialogTitle
                            className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold"
                            render={
                              <motion.h2 layoutId={`title-${activeItem.id}`}>
                                {activeItem.title}
                              </motion.h2>
                            }
                          />
                          <motion.div
                            animate={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 10 }}
                            transition={{ delay: 0.2 }}
                          >
                            {activeItem.content}
                          </motion.div>
                        </div>

                        <DialogClose
                          className="absolute right-4 top-4 z-20"
                          render={
                            <Button
                              className="rounded-full shadow-lg"
                              size="icon"
                              variant="secondary"
                            >
                              <X size={16} />
                            </Button>
                          }
                        />
                      </motion.div>
                    </ScrollArea>
                  </DialogPopup>
                </DialogViewport>
              </DialogPortal>
            )}
          </AnimatePresence>
        </Dialog>
      </LayoutGroup>
    </div>
  );
}

type CardItem = {
  id: string;
  title: string;
  image: string;
  content: React.ReactNode;
};

const ITEMS: CardItem[] = [
  {
    content: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Modern development is human + AI. We optimized Lumi UI's structure so
          that AI assistants generate correct, idiomatic code on the first
          attempt.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-foreground">Flat Semantic Exports:</strong>{" "}
            Every component is accessible at the root level, making it easier
            for AI to infer usage and reducing context tokens.
          </li>
          <li>
            <strong className="text-foreground">
              Composites as Living Examples:
            </strong>{" "}
            Our composite components serve as executable documentation.
          </li>
          <li>
            <strong className="text-foreground">Immutable Logic Blocks:</strong>{" "}
            Primitives are stable building blocks. You compose them rather than
            modifying core logic.
          </li>
        </ul>
        <div className="pt-8">
          <h4 className="text-foreground font-semibold mb-4 text-lg">
            Deep Dive: Optimization
          </h4>
          <div className="grid gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div className="bg-muted/50 rounded-lg p-4 space-y-2" key={i}>
                <div className="h-4 w-1/3 bg-muted rounded" />
                <div className="h-20 w-full bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    id: "card-1",
    image: "/images/placeholder.svg",
    title: "Discoverable",
  },
  {
    content: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Base UI provides the behavioral foundation, but we provide the visual
          consistency. Every component adapts to your needs following a unified
          language.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-foreground">The Utility Pattern:</strong> We
            use utility classes to provide consistent styling across all
            components.
          </li>
          <li>
            <strong className="text-foreground">Global Animation:</strong> All
            interactive elements use globally configured animation utilities for
            cohesive transitions.
          </li>
          <li>
            <strong className="text-foreground">Hit-Test Philosophy:</strong> We
            use pseudo-elements to separate visual highlights from interactive
            containers, creating forgiving, clickable areas.
          </li>
        </ul>
        <div className="pt-8">
          <h4 className="text-foreground font-semibold mb-4 text-lg">
            Design System Specs
          </h4>
          <div className="grid gap-4">
            <div className="aspect-video bg-muted rounded-lg w-full flex items-center justify-center text-muted-foreground">
              Animation Curve Visualization
            </div>
            <div className="aspect-video bg-muted rounded-lg w-full flex items-center justify-center text-muted-foreground">
              Spacing Scale
            </div>
          </div>
        </div>
      </div>
    ),
    id: "card-2",
    image: "/images/placeholder.svg",
    title: "Predictable",
  },
  {
    content: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          We refuse the false dichotomy between speed and control. Our Dual
          Layer Architecture accommodates both prototyping and polishing modes.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-foreground">Composites = Velocity:</strong>{" "}
            Pre-assembled components that combine structure, styling, and logic
            for MVPs and standard use cases.
          </li>
          <li>
            <strong className="text-foreground">Primitives = Control:</strong>{" "}
            Thin wrappers around Base UI that enforce zero visual layout, giving
            you complete control over DOM structure.
          </li>
          <li>
            <strong className="text-foreground">Mix and Match:</strong> Use
            composites for speed and primitive blocks for unique custom designs
            in the same project.
          </li>
        </ul>
        <div className="pt-8">
          <h4 className="text-foreground font-semibold mb-4 text-lg">
            Component Architecture
          </h4>
          <div className="flex flex-col gap-4">
            <div className="h-32 bg-muted rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
              Composite Layer
            </div>
            <div className="h-10 text-center text-muted-foreground text-sm">
              ↓ Adapts to ↓
            </div>
            <div className="h-32 bg-muted rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
              Primitive Layer
            </div>
          </div>
        </div>
      </div>
    ),
    id: "card-3",
    image: "/images/placeholder.svg",
    title: "Composable",
  },
];
