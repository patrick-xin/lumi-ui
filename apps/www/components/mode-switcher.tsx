"use client";

import { Button } from "@/registry/ui/button";
import { useMounted } from "@lumi-ui/ui/hooks/use-mounted";
import { cn } from "@lumi-ui/ui/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";

export function ModeSwitcher({
  className,
  variant = "glow",
}: {
  className?: string;
  variant?: "glow" | "ghost";
}) {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();

  const toggleMode = () => {
    if (!resolvedTheme) return;

    const parts = resolvedTheme.split("-");

    if (parts.length === 2) {
      const [themeSet, currentMode] = parts;
      const newMode = currentMode === "dark" ? "light" : "dark";
      setTheme(`${themeSet}-${newMode}`);
    } else {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }
  };

  if (!mounted) {
    return null;
  }

  const currentMode = resolvedTheme?.includes("dark") ? "dark" : "light";

  return (
    <Button
      className={cn("group/toggle extend-touch-target size-8", className)}
      onClick={toggleMode}
      size="icon"
      title="Toggle theme"
      variant={variant}
    >
      <AnimatePresence initial={false} mode="wait">
        {currentMode === "dark" ? (
          <motion.svg
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            className="size-4.5"
            exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
            fill="none"
            height="20"
            initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
            key="moon"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            viewBox="0 0 24 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>moon icon</title>
            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
          </motion.svg>
        ) : (
          <motion.svg
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            className="size-4.5"
            exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
            fill="none"
            height="20"
            initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
            key="sun"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            viewBox="0 0 24 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>sun icon</title>
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </motion.svg>
        )}
      </AnimatePresence>

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
