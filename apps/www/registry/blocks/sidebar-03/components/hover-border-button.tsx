"use client";

import { Button } from "@/registry/ui/button";
import { cn } from "@/registry/lib/utils";
import { motion } from "motion/react";
import type React from "react";
import { useCallback, useEffect, useState } from "react";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

const movingMap: Record<Direction, string> = {
  BOTTOM:
    "radial-gradient(20.7% 50% at 50% 100%, var(--primary) 0%, var(--accent) 100%)",
  LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, var(--primary) 0%, var(--accent) 100%)",
  RIGHT:
    "radial-gradient(16.2% 41.2% at 100% 50%, var(--primary) 0%, var(--accent) 100%)",
  TOP: "radial-gradient(20.7% 50% at 50% 0%, var(--primary) 0%, var(--accent) 100%)",
};

const highlight =
  "radial-gradient(75% 181.15942028985506% at 50% 50%, var(--primary) 0%, var(--accent) 100%)";

export function HoverBorderButton({
  children,
  className,
  duration = 1,
  clockwise = true,
  animate = true,
  ...props
}: React.PropsWithChildren<
  {
    duration?: number;
    clockwise?: boolean;
    animate?: boolean;
  } & React.ComponentProps<typeof Button>
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  const rotateDirection = useCallback(
    (currentDirection: Direction): Direction => {
      const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
      const currentIndex = directions.indexOf(currentDirection);
      const nextIndex = clockwise
        ? (currentIndex - 1 + directions.length) % directions.length
        : (currentIndex + 1) % directions.length;
      return directions[nextIndex];
    },
    [clockwise],
  );

  useEffect(() => {
    if (!hovered && animate) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, animate, duration, rotateDirection]);

  return (
    <Button
      className={cn(
        "relative flex rounded-sm border content-center transition duration-100 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px box-decoration-clone w-fit",
        "focus-visible:outline focus-visible:outline-ring focus-visible:ring-4 focus-visible:ring-ring/10",
      )}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      variant="unstyled"
      {...props}
    >
      <div
        className={cn(
          "w-auto text-foreground z-10 bg-background rounded-[inherit]",
          className,
        )}
      >
        {children}
      </div>
      <motion.div
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        className={cn(
          "flex-none size-full blur-xs inset-0 overflow-hidden absolute z-0 rounded-[inherit]",
        )}
        initial={{ background: movingMap[direction] }}
        transition={{ duration: duration ?? 1, ease: "linear" }}
      />
      <div className="bg-background absolute z-1 flex-none inset-px rounded-full" />
    </Button>
  );
}
