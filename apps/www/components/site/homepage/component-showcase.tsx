"use client";

import { motion } from "motion/react";
import Link from "next/link";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";

const smoothEase = [0.25, 1, 0.5, 1] as const;

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { delay, duration: 0.5, ease: smoothEase },
    y: 0,
  }),
};

export default function ComponentShowcase() {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <motion.section
      animate="visible"
      className="container mx-auto hidden md:block"
      custom={0.3}
      initial="hidden"
      variants={fadeUpVariants}
    >
      <div className="relative flex flex-col items-center justify-center">
        <div className="group relative flex h-[450px] w-full items-center justify-center overflow-hidden rounded-md perspective-[2000px]">
          <div
            className={cn(
              "absolute inset-0 mx-auto",
              "w-[95%] h-[520px] md:h-[600px] will-change-transform",
              "[transform:translate(10%,-5%)_scale(1.1)_rotateX(47deg)_rotateY(32deg)_rotate(324deg)]",
              "bg-background border border-border rounded-xl shadow-2xl shadow-primary/10",
              "after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-b after:from-transparent after:via-transparent after:to-background after:z-20",
            )}
          >
            <div className="absolute inset-0 rounded-xl bg-background/50 ring-1 ring-inset ring-border/50" />

            <motion.div
              animate={{ opacity: loaded ? 0 : 1 }}
              aria-hidden
              className="absolute inset-0 rounded-xl bg-muted/30"
              initial={{ opacity: 1 }}
              transition={{ duration: 0.35, ease: smoothEase }}
            >
              <div className="h-full w-full rounded-xl animate-pulse" />
            </motion.div>

            <motion.iframe
              animate={{ opacity: loaded ? 0.9 : 0 }}
              className="h-full w-full rounded-xl bg-muted/20 grayscale-[0.2] invert-[0.02]"
              initial={{ opacity: 0 }}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              src="/view/dashboard-01"
              tabIndex={-1}
              title="Lumi Dashboard"
              transition={{ duration: 0.45, ease: smoothEase }}
            />
          </div>

          <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        <div className="relative z-40 -mt-12 flex justify-center">
          <Button
            className="shadow-lg shadow-primary/20"
            nativeButton={false}
            render={
              <Link href="/view/dashboard-01" target="_blank">
                See in action
              </Link>
            }
            size="lg"
            variant="default"
          />
        </div>
      </div>
    </motion.section>
  );
}
