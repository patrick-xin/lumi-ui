"use client";

import type { icons } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FOLDERS_WITH_STATUS, NON_CLICKABLE_STATUSES } from "@/lib/constants";
import { IconMap } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { DocPageNode, DocRoot } from "@/types";

interface DocsSidebarNavProps {
  tree: DocRoot;
}

export const DocsSidebar = ({ tree }: DocsSidebarNavProps) => {
  const pathname = usePathname();

  return (
    <aside className="sticky top-(--header-height) hidden h-[calc(100dvh-var(--header-height))] w-full shrink-0 self-start md:block overflow-auto no-scrollbar">
      <nav className="py-12">
        <ul className="h-full [&>li:not(:first-child)>div]:pt-4 pb-6">
          {tree.children.map((item) => (
            <li key={item.$id}>
              <div className="relative z-10 pb-4 text-xs text-muted-foreground/70">
                {item.name}
              </div>
              {item.type === "folder" && (
                <ul className="space-y-3 border-l">
                  {item.children.map((child) => {
                    if (child.type !== "page") return null;

                    const pageNode = child as DocPageNode;
                    const shouldShowStatus = FOLDERS_WITH_STATUS.includes(
                      item.name as string,
                    );

                    return (
                      <li key={child.$id} className="relative">
                        <NavItem
                          child={pageNode}
                          isActive={child.url === pathname}
                          shouldShowStatus={shouldShowStatus}
                        />
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

interface NavItemProps {
  child: DocPageNode;
  isActive: boolean;
  shouldShowStatus: boolean;
}

function NavItem({ child, isActive, shouldShowStatus }: NavItemProps) {
  const status = child.status;
  const shouldRenderAsSpan =
    shouldShowStatus && status && NON_CLICKABLE_STATUSES.includes(status);

  if (shouldRenderAsSpan) {
    return (
      <span
        className={cn(
          "relative inline-flex items-center pl-4 ml-2 text-sm pointer-events-none",
          "text-foreground/30",
        )}
      >
        {child.name}
      </span>
    );
  }
  const Icon = IconMap[child.icon as keyof typeof icons];
  return (
    <Link
      className={cn(
        "relative text-muted-foreground inline-flex items-center pl-4 ml-2 text-sm",
        "hover:text-primary transition-colors ease-linear w-4/6 rounded-sm py-1",
        isActive && "text-primary bg-accent",
      )}
      href={child.url}
    >
      <span className="inline-flex gap-2 items-center">
        {Icon && <Icon className="size-4" />}
        {child.name}
      </span>
      {isActive && (
        <div className="absolute -left-[9px] top-0 w-px bg-primary h-full" />
      )}

      {shouldShowStatus && status && status === "new" && (
        <span className="inline-block size-2 mt-px rounded-full bg-primary ml-4" />
      )}
    </Link>
  );
}
