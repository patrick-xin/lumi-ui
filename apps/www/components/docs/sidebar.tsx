"use client";

import { ChevronRight, ExternalLink, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { hasActiveChild, normalizeSidebarTree } from "@/lib/sidebar-utils";
import { cn } from "@/lib/utils";
import { Badge } from "@/registry/ui/badge";
import { Button } from "@/registry/ui/button";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/registry/ui/collapsible";
import { ScrollArea } from "@/registry/ui/scroll-area";
import type {
  DocRoot,
  SidebarFolderItem,
  SidebarItem,
  SidebarLinkItem,
} from "@/types";

interface DocsSidebarProps {
  tree: DocRoot;
}

export const DocsSidebar = ({ tree }: DocsSidebarProps) => {
  const pathname = usePathname();

  const items = normalizeSidebarTree(tree, pathname);

  return (
    <aside className="fixed inset-y-0 left-[max(0px,calc(50%-var(--container-size)/2))] z-30 hidden w-[240px] flex-col  md:flex top-[var(--header-height)]">
      <ScrollArea gradientScrollFade noScrollBar>
        <nav className="w-full space-y-6 pt-16 xl:pt-8 pb-48">
          {items.map((item, index) => (
            <SidebarSection key={String(index)} item={item} />
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
};

// Section Header (e.g. "GET STARTED", "COMPONENTS")
const SidebarSection = ({ item }: { item: SidebarItem }) => {
  if (item.type !== "header") return null;

  return (
    <div className="flex flex-col gap-2">
      <h4 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
        {item.label}
      </h4>
      <SidebarTree items={item.items} level={0} />
    </div>
  );
};

const SidebarTree = ({
  items,
  level,
}: {
  items: SidebarItem[];
  level: number;
}) => {
  if (!items.length) return null;

  return (
    <ul className={cn("grid gap-1 px-2", level > 0 && "pl-4 border-l ml-2")}>
      {items.map((item, index) => (
        <li key={index}>
          {item.type === "folder" ? (
            <SidebarFolder item={item} level={level} />
          ) : item.type === "link" ? (
            <SidebarLink item={item} />
          ) : null}
        </li>
      ))}
    </ul>
  );
};

// Collapsible Folder
const SidebarFolder = ({
  item,
  level,
}: {
  item: SidebarFolderItem;
  level: number;
}) => {
  const isActiveFolder = hasActiveChild(item.items);

  return (
    <Collapsible defaultOpen={true} className="group/collapsible">
      <CollapsibleTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-full justify-between h-8 px-2 text-sm font-semibold",
              isActiveFolder && "text-primary",
            )}
          >
            {item.label}
            <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[open]/collapsible:rotate-90" />
          </Button>
        }
      />
      <CollapsiblePanel>
        <div className="pt-1">
          <SidebarTree items={item.items} level={level + 1} />
        </div>
      </CollapsiblePanel>
    </Collapsible>
  );
};

const SidebarLink = ({ item }: { item: SidebarLinkItem }) => {
  const Icon = item.icon as LucideIcon;

  if (item.disabled) {
    return (
      <span className="flex h-8 w-full items-center px-2 text-sm text-muted-foreground/40 cursor-not-allowed">
        {item.label}
        {item.status === "planned" && (
          <Badge
            variant="outline"
            className="ml-auto text-[9px] font-medium text-muted-foreground/50"
          >
            Planned
          </Badge>
        )}
      </span>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "w-full justify-start h-8 px-2 text-sm font-normal text-muted-foreground",
        item.active &&
          "bg-accent text-primary hover:bg-accent! hover:text-primary",
      )}
      nativeButton={false}
      render={
        <Link href={item.href} target={item.external ? "_blank" : undefined}>
          {Icon && <Icon className="mr-2 h-4 w-4 shrink-0" />}
          <span className="truncate">{item.label}</span>

          {item.status === "new" && (
            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          )}
          {item.status === "planned" && (
            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
          )}
          {item.status === "in-progress" && (
            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-amber-500/70" />
          )}
          {item.external && (
            <ExternalLink className="ml-auto h-3 w-3 opacity-50" />
          )}
        </Link>
      }
    />
  );
};
