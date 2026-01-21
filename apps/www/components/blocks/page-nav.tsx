"use client";

import { cn } from "@lumi-ui/ui/lib/utils";
import { ScrollArea } from "@lumi-ui/ui/scroll-area";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface PageNavItem {
  title: string;
  href: string;
}

export function PageNav({
  className,
  items,
  ...props
}: React.ComponentProps<"div"> & { items: PageNavItem[] }) {
  const pathname = usePathname();

  return (
    <div className={cn("relative overflow-hidden max-w-6xl mt-8 mx-auto", className)} {...props}>
      <ScrollArea
        className="w-96 md:w-auto max-w-none"
        gradientScrollFade
        noScrollBar
      >
        <div className="flex items-center w-max">
          {items.map((item) => {
            const isActive =
              item.href === "/blocks"
                ? pathname === "/blocks"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "hover:text-primary flex h-7 items-center justify-center px-4 text-center text-sm font-medium transition-colors first:pl-0",
                  isActive
                    ? "text-primary data-[active=true]:text-primary"
                    : "text-muted-foreground"
                )}
                data-active={isActive}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
