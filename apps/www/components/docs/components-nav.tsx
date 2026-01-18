"use client";

import { ScrollArea } from "@lumi-ui/ui/scroll-area";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { registryComponentCategories } from "@/lib/categories";

export function ComponentsNav() {
  const pathname = usePathname();

  return (
    <div className="relative overflow-hidden max-w-6xl mx-auto">
      <ScrollArea
        className="w-96 md:w-auto max-w-none"
        gradientScrollFade
        noScrollBar
      >
        <div className="flex items-center w-max">
          {registryComponentCategories.map((category) => (
            <ComponentsNavLink
              category={category}
              isActive={pathname.includes(`/components/${category.slug}`)}
              key={category.slug}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function ComponentsNavLink({
  category,
  isActive,
}: {
  category: (typeof registryComponentCategories)[number];
  isActive: boolean;
}) {
  if (category.hidden) {
    return null;
  }

  return (
    <Link
      className="text-muted-foreground hover:text-primary data-[active=true]:text-primary flex h-7 items-center justify-center px-4 text-center text-sm font-medium transition-colors first:pl-0"
      data-active={isActive}
      href={`/components/${category.slug}`}
      key={category.slug}
    >
      {category.name}
    </Link>
  );
}
