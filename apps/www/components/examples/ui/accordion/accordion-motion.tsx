"use client";

import { motion } from "motion/react";
import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionSummary,
} from "@/registry/ui/accordion";

const items = [
  {
    content: "Yes. It adheres to the WAI-ARIA design pattern.",
    id: "item-1",
    title: "Is it accessible?",
  },
  {
    content:
      "Yes. It comes with default styles that matches the other components' aesthetic.",
    id: "item-2",
    title: "Is it styled?",
  },
  {
    content:
      "Yes. It's animated by default, but you can disable it if you prefer.",
    id: "item-3",
    title: "Is it animated?",
  },
];

export default function AccordionMotionDemo() {
  const [value, setValue] = useState<string[]>(["item-1"]);

  return (
    <Accordion
      className="w-full max-w-md"
      keepMounted
      onValueChange={setValue}
      value={value}
    >
      {items.map((item) => {
        const isOpen = value.includes(item.id);
        return (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionSummary>{item.title}</AccordionSummary>
            <AccordionPanel
              // Disable default css transition
              animation="none"
              keepMounted
              render={
                <motion.div
                  animate={isOpen ? "open" : "collapsed"}
                  className="overflow-hidden"
                  hidden={false}
                  initial={false}
                  variants={{
                    collapsed: {
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: {
                          duration: 0.3,
                          ease: [0.4, 0, 0.2, 1],
                          type: "tween",
                        },
                        opacity: {
                          duration: 0.2,
                        },
                      },
                    },
                    open: {
                      height: "auto",
                      opacity: 1,
                      transition: {
                        height: {
                          bounce: 0,
                          duration: 0.4,
                          type: "spring",
                        },
                        opacity: {
                          delay: 0.15,
                          duration: 0.25,
                        },
                      },
                    },
                  }}
                />
              }
            >
              {item.content}
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
