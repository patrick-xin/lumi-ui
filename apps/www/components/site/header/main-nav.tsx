"use client";

import { buttonVariants } from "@lumi-ui/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function MainNav({
  items,
  className,
  ...props
}: React.ComponentProps<"nav"> & {
  items: { href: string; label: string }[];
}) {
  return (
    <nav className={cn("flex items-center gap-2 h-full", className)} {...props}>
      {items.map((item) => (
        <Link
          className={cn(
            buttonVariants({ size: "sm", variant: "ghost" }),
            "hover:bg-transparent hover:text-primary",
          )}
          href={item.href}
          key={item.href}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
