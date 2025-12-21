"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/ui/button";

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
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "hover:bg-transparent hover:text-primary",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
