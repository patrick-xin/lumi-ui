"use client";

import { ScrollArea } from "@lumi-ui/ui/scroll-area";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { registryBlockCategories } from "@/lib/categories";

export function BlocksNav() {
  const pathname = usePathname();

  return (
    <div className="relative overflow-hidden">
      <ScrollArea className="max-w-none">
        <div className="flex items-center">
          <BlocksNavLink
            category={{ hidden: false, name: "Featured", slug: "" }}
            isActive={pathname === "/blocks"}
          />
          {registryBlockCategories.map((category) => (
            <BlocksNavLink
              category={category}
              isActive={pathname === `/blocks/${category.slug}`}
              key={category.slug}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function BlocksNavLink({
  category,
  isActive,
}: {
  category: (typeof registryBlockCategories)[number];
  isActive: boolean;
}) {
  if (category.hidden) {
    return null;
  }

  return (
    <Link
      className="text-muted-foreground hover:text-primary data-[active=true]:text-primary flex h-7 items-center justify-center px-4 text-center text-base font-medium transition-colors"
      data-active={isActive}
      href={`/blocks/${category.slug}`}
      key={category.slug}
    >
      {category.name}
    </Link>
  );
}
