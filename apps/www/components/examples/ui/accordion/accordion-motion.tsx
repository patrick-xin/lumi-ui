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
    id: "item-1",
    title: "Is it accessible?",
    content: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    id: "item-2",
    title: "Is it styled?",
    content:
      "Yes. It comes with default styles that matches the other components' aesthetic.",
  },
  {
    id: "item-3",
    title: "Is it animated?",
    content:
      "Yes. It's animated by default, but you can disable it if you prefer.",
  },
];

export default function AccordionMotionDemo() {
  const [value, setValue] = useState<string[]>(["item-1"]);

  return (
    <Accordion
      keepMounted
      value={value}
      onValueChange={setValue}
      className="w-full max-w-md"
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
                  hidden={false}
                  initial={false}
                  animate={isOpen ? "open" : "collapsed"}
                  variants={{
                    open: {
                      height: "auto",
                      opacity: 1,
                      transition: {
                        height: {
                          type: "spring",
                          bounce: 0,
                          duration: 0.4,
                        },
                        opacity: {
                          duration: 0.25,
                          delay: 0.15,
                        },
                      },
                    },
                    collapsed: {
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: {
                          type: "tween",
                          ease: [0.4, 0, 0.2, 1],
                          duration: 0.3,
                        },
                        opacity: {
                          duration: 0.2,
                        },
                      },
                    },
                  }}
                  className="overflow-hidden"
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
