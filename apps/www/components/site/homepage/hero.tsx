"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";

const smoothEase = [0.25, 1, 0.5, 1] as const;

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: {
      delay,
      duration: 0.5,
      ease: smoothEase,
    },
    y: 0,
  }),
};

export function HeroSection() {
  const t = useTranslations("HomePage");
  return (
    <div className="overflow-hidden">
      <section>
        <div className="relative pt-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex flex-col justify-center">
              <div className="relative mx-auto">
                {/* Corner gradients */}
                <CornerGradients />
                <motion.h1
                  animate="visible"
                  className={cn(
                    "text-center text-5xl font-bold tracking-tight md:text-7xl",
                  )}
                  custom={0}
                  initial="hidden"
                  variants={fadeUpVariants}
                >
                  <span className="relative inline-block overflow-hidden text-transparent bg-clip-text bg-gradient-to-b from-primary/20 via-primary/70 to-primary/40">
                    {t("title")}
                  </span>
                </motion.h1>
              </div>
              <motion.p
                animate="visible"
                className="mt-8 text-pretty text-lg text-muted-foreground mx-auto max-w-2xl text-center"
                custom={0.1}
                initial="hidden"
                variants={fadeUpVariants}
              >
                {t("description")}
                <br />
                <span className="inline-block font-semibold text-foreground mt-2">
                  {t("subtitle")}
                </span>
              </motion.p>
              <motion.div
                animate="visible"
                className="mt-12 flex justify-center items-center flex-wrap gap-4 mx-auto md:hidden"
                custom={0.2}
                initial="hidden"
                variants={fadeUpVariants}
              >
                <Button
                  className="w-50"
                  nativeButton={false}
                  render={
                    <Link href="/docs/introduction">
                      <span className="text-nowrap">{t("viewDocs")}</span>
                    </Link>
                  }
                  size="lg"
                />
                <Button
                  className="w-50"
                  nativeButton={false}
                  render={
                    <Link href="/docs/components">
                      <span className="text-nowrap">
                        {t("browseComponents")}
                      </span>
                    </Link>
                  }
                  size="lg"
                  variant="glow"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const CornerGradients = () => {
  return (
    <>
      <motion.div
        animate={{ opacity: 0.5, scaleX: 1 }}
        aria-hidden
        className="absolute -top-4 -left-4 w-16 h-px opacity-50"
        initial={{ opacity: 0, scaleX: 0 }}
        style={{ transformOrigin: "left" }}
        transition={{ delay: 0.3, duration: 0.6, ease: smoothEase }}
      >
        <div
          className="h-full w-full"
          style={{
            background: `linear-gradient(to right, var(--primary), transparent)`,
          }}
        />
      </motion.div>
      <motion.div
        animate={{ opacity: 0.5, scaleY: 1 }}
        aria-hidden
        className="absolute -top-4 -left-4 w-px h-16 opacity-50"
        initial={{ opacity: 0, scaleY: 0 }}
        style={{ transformOrigin: "top" }}
        transition={{ delay: 0.35, duration: 0.6, ease: smoothEase }}
      >
        <div
          className="h-full w-full"
          style={{
            background: `linear-gradient(to bottom, var(--primary), transparent)`,
          }}
        />
      </motion.div>
      <motion.div
        animate={{ opacity: 0.5, scaleX: 1 }}
        aria-hidden
        className="absolute -bottom-4 -right-4 w-16 h-px opacity-50"
        initial={{ opacity: 0, scaleX: 0 }}
        style={{ transformOrigin: "right" }}
        transition={{ delay: 0.4, duration: 0.6, ease: smoothEase }}
      >
        <div
          className="h-full w-full"
          style={{
            background: `linear-gradient(to left, var(--primary), transparent)`,
          }}
        />
      </motion.div>
      <motion.div
        animate={{ opacity: 0.5, scaleY: 1 }}
        aria-hidden
        className="absolute -bottom-4 -right-4 w-px h-16 opacity-50"
        initial={{ opacity: 0, scaleY: 0 }}
        style={{ transformOrigin: "bottom" }}
        transition={{ delay: 0.45, duration: 0.6, ease: smoothEase }}
      >
        <div
          className="h-full w-full"
          style={{
            background: `linear-gradient(to top, var(--primary), transparent)`,
          }}
        />
      </motion.div>
    </>
  );
};
