"use client";

import { useMounted } from "@lumi-ui/ui/hooks/use-mounted";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { Button } from "@/registry/ui/button";

export function ModeSwitcher() {
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
      variant="glow"
      size="icon"
      className="group/toggle extend-touch-target size-8"
      onClick={toggleMode}
      title="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {currentMode === "dark" ? (
          <motion.svg
            key="moon"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4.5"
            initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <title>moon icon</title>
            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
          </motion.svg>
        ) : (
          <motion.svg
            key="sun"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4.5"
            initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
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
