"use client";

import { buttonVariants } from "@lumi-ui/ui/button";
import { usePathname } from "next/navigation";
import { Link } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils";

export function MainNav({
  items,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  items: { href: string; label: string }[];
}) {
  const pathname = usePathname();
  return (
    <div className={cn("flex items-center gap-2 h-full", className)} {...props}>
      {items.map((item) => (
        <Link
          className={cn(
            buttonVariants({ size: "sm", variant: "ghost" }),
            "hover:bg-transparent hover:text-primary",
            pathname.includes(item.href) && "text-primary",
          )}
          href={item.href}
          key={item.href}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
