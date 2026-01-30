"use client";

import type { DialogRootActions } from "@base-ui/react/dialog";
import {
  BrainCircuitIcon,
  LayersIcon,
  PlusIcon,
  SparklesIcon,
  X,
} from "lucide-react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useRef, useState } from "react";
import { Button } from "@/registry/ui/button";
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogViewport,
} from "@/registry/ui/dialog";
import { ScrollArea } from "@/registry/ui/scroll-area";

type PhilosophyItem = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  gradient: string;
};

const PHILOSOPHY_ITEMS: PhilosophyItem[] = [
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
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="h-4 w-1/3 bg-muted rounded" />
              <div className="h-20 w-full bg-muted rounded" />
            </div>
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="h-4 w-1/3 bg-muted rounded" />
              <div className="h-20 w-full bg-muted rounded" />
            </div>
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="h-4 w-1/3 bg-muted rounded" />
              <div className="h-20 w-full bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    ),
    gradient: "from-primary/5 to-primary/15",
    icon: <BrainCircuitIcon className="size-6" />,
    id: "discoverable",
    subtitle: "AI-first flat exports",
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
    gradient: "from-accent/5 to-accent/15",
    icon: <SparklesIcon className="size-6" />,
    id: "predictable",
    subtitle: "Unified design language",
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
    gradient: "from-primary/5 via-transparent to-accent/10",
    icon: <LayersIcon className="size-6" />,
    id: "composable",
    subtitle: "Dual-layer architecture",
    title: "Composable",
  },
];

export function PhilosophyCards() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<PhilosophyItem | null>(null);

  const actionsRef = useRef<DialogRootActions>({
    close: () => {},
    unmount: () => {},
  });

  const handleOpen = (item: PhilosophyItem) => {
    setActiveItem(item);
    setIsOpen(true);
  };

  const handleClose = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <section className="py-24 container">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        viewport={{ margin: "-100px", once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Why Lumi UI?
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Built on proven foundations with a clear philosophy for modern
          development.
        </p>
      </motion.div>

      <LayoutGroup>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {PHILOSOPHY_ITEMS.map((item, index) => (
            <motion.button
              className={`relative group flex flex-col cursor-pointer bg-linear-to-br ${item.gradient} border border-border/50 hover:border-border transition-colors rounded-lg p-6 text-left focus-visible:outline focus-visible:outline-ring focus-visible:ring-4 focus-visible:ring-primary/10`}
              initial={{ opacity: 0, y: 20 }}
              key={item.id}
              layoutId={`card-container-${item.id}`}
              onClick={() => handleOpen(item)}
              style={{
                opacity: activeItem?.id === item.id && isOpen ? 0 : 1,
                pointerEvents:
                  activeItem?.id === item.id && isOpen ? "none" : "auto",
              }}
              transition={{
                delay: index * 0.1,
                duration: 0.4,
                ease: [0.25, 1, 0.5, 1],
              }}
              viewport={{ margin: "-50px", once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start justify-between w-full mb-4">
                <motion.div
                  className="p-2 rounded-md bg-background/80 text-primary"
                  layoutId={`icon-${item.id}`}
                >
                  {item.icon}
                </motion.div>
                <PlusIcon className="size-5 group-hover:text-foreground text-muted-foreground transition-colors" />
              </div>
              <motion.h3
                className="text-xl font-semibold mb-2"
                layoutId={`title-${item.id}`}
                transition={{ duration: 0.2 }}
              >
                {item.title}
              </motion.h3>
              <motion.p
                className="text-sm text-muted-foreground"
                layoutId={`subtitle-${item.id}`}
              >
                {item.subtitle}
              </motion.p>
            </motion.button>
          ))}
        </div>

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
                  className="grid place-items-center p-4 pt-24"
                  hidden={false}
                >
                  <DialogPopup
                    className="relative w-full max-w-2xl flex flex-col overflow-hidden rounded-lg bg-background"
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
                    <ScrollArea
                      className="max-h-[calc(100vh-8rem)]"
                      noScrollBar
                    >
                      <motion.div
                        animate={{ opacity: 1 }}
                        className="flex flex-col"
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <div className="p-6 sm:p-8">
                          <div className="flex items-center gap-4 mb-6">
                            <motion.div
                              className="p-3 rounded-lg bg-muted text-primary"
                              layoutId={`icon-${activeItem.id}`}
                            >
                              {activeItem.icon}
                            </motion.div>
                            <div>
                              <DialogTitle
                                className="text-2xl sm:text-3xl font-bold"
                                render={
                                  <motion.h2
                                    layoutId={`title-${activeItem.id}`}
                                  >
                                    {activeItem.title}
                                  </motion.h2>
                                }
                              />
                              <motion.p
                                className="text-muted-foreground"
                                layoutId={`subtitle-${activeItem.id}`}
                              >
                                {activeItem.subtitle}
                              </motion.p>
                            </div>
                          </div>
                          <motion.div
                            animate={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 10 }}
                            transition={{ delay: 0.15 }}
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
    </section>
  );
}
