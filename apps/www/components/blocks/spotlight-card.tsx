"use client";

import { cn } from "@lumi-ui/ui/lib/utils";
import type React from "react";
import { useCallback, useRef, useState } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SpotlightCard = ({
  children,
  className = "",
  tabIndex: externalTabIndex,
  ...props
}: SpotlightCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  const handleFocus = useCallback(() => {
    setOpacity(1);
  }, []);

  const handleBlur = useCallback(() => {
    setOpacity(0);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setOpacity(1);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
  }, []);

  return (
    <div
      className="relative w-full max-w-xs overflow-hidden rounded-xl bg-background outline-1 outline-border"
      onBlur={handleBlur}
      onFocus={handleFocus}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={divRef}
      tabIndex={externalTabIndex ?? 0}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), oklch(from var(--primary) l c h / 0.2), transparent 40%)`,
          opacity,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px transition duration-300 ease-out"
        style={{
          background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), oklch(from var(--primary) l c h / 0.15), transparent 40%)`,
          opacity: opacity,
        }}
      />
      <div
        className={cn(
          "relative z-10 flex h-full flex-col gap-2 rounded-md bg-background p-4 hover:bg-primary/15 transition-colors duration-300",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};
