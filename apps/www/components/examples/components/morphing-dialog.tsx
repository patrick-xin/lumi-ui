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
    <div className="flex flex-col justify-center items-center">
      <LayoutGroup>
          <ScrollArea noScrollBar>
            <div className="flex gap-2 max-w-5xl mx-auto mt-12">
              {ITEMS.map((item) => (
                <motion.div
                  className="relative group flex flex-col cursor-pointer bg-muted hover:bg-muted/80 transition-colors flex-1 size-80 rounded-md"
                  key={item.id}
                  layoutId={`card-container-${item.id}`}
                  onClick={() => handleOpen(item)}
                  style={{
                    opacity: activeItem?.id === item.id && isOpen ? 0 : 1,
                    pointerEvents:
                      activeItem?.id === item.id && isOpen ? "none" : "auto",
                  }}
                >
                  <div className="relative h-48 w-full overflow-hidden rounded-t-md">
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

                  <div className="flex flex-1 p-4 justify-between items-center">
                    <motion.h3
                      className="text-lg font-semibold"
                      layoutId={`title-${item.id}`}
                      transition={{ duration: 0.2 }}
                    >
                      {item.title}
                    </motion.h3>

                    <Button
                      className="rounded-full cursor-pointer"
                      onClick={() => handleOpen(item)}
                      size="icon"
                      variant="outline"
                    >
                      <PlusIcon className="group-hover:text-foreground text-muted-foreground transition-all" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
          <Dialog actionsRef={actionsRef} onOpenChange={handleClose} open={isOpen}>
            <AnimatePresence mode="popLayout">
              {isOpen && activeItem && (
                <DialogPortal keepMounted>
                  <DialogBackdrop />
                  <DialogViewport
                    className="grid place-items-center p-4 pt-48 sm:pt-32"
                    hidden={false}
                  >
                    <DialogPopup
                      className="relative w-full max-w-4xl flex flex-col overflow-hidden rounded-md"
                      hidden={false}
                      render={
                        <motion.div
                          animate={{ borderRadius: "10px" }}
                          exit={{ borderRadius: "10px" }}
                          initial={{ borderRadius: "10px" }}
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
                          className="flex flex-col h-full pb-32"
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

                          <div className="flex flex-col p-4 sm:p-8 justify-center text-left space-y-6 sm:space-y-12">
                            <DialogTitle
                              className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold"
                              render={
                                <motion.h2 layoutId={`title-${activeItem.id}`}>
                                  {activeItem.title}
                                </motion.h2>
                              }
                            />
                            {Array.from({ length: 12 }).map((_, i) => (
                              <motion.div
                                animate={{ opacity: 1, y: 0 }}
                                className="flex h-48 mt-4 w-full shrink-0 items-center justify-center rounded-md bg-muted"
                                initial={{ opacity: 0, y: 10 }}
                                key={String(i)}
                                transition={{ delay: 0.2 + i * 0.05 }}
                              />
                            ))}

                            <div className="flex justify-center">
                              <Button>Learn more</Button>
                            </div>
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
};

const ITEMS: CardItem[] = [
  {
    id: "card-1",
    image: "/images/placeholder.svg",
    title: "Discoverable",
  },
  {
    id: "card-2",
    image: "/images/placeholder.svg",
    title: "Predictable",
  },
  {
    id: "card-3",
    image: "/images/placeholder.svg",
    title: "Composable",
  },
];
