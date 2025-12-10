"use client";

import { ChevronRight, ExternalLink, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { hasActiveChild, normalizeSidebarTree } from "@/lib/sidebar-utils";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/ui/collapsible";
import type {
  DocRoot,
  SidebarFolderItem,
  SidebarItem,
  SidebarLinkItem,
} from "@/types";
import { Badge } from "../../registry/ui/badge";

interface DocsSidebarProps {
  tree: DocRoot;
}

export const DocsSidebar = ({ tree }: DocsSidebarProps) => {
  const pathname = usePathname();
  const items = normalizeSidebarTree(tree, pathname);

  return (
    <aside className="fixed inset-y-0 left-[max(0px,calc(50%-var(--container-size)/2))] z-30 hidden h-full w-[240px] flex-col bg-background md:flex top-[var(--header-height)]">
      <div className="from-background via-background/80 to-background/50 sticky top-0 z-10 h-8 shrink-0 bg-gradient-to-b blur-xs" />
      <div className="h-full overflow-y-auto no-scrollbar pb-[240px] pl-2 pr-4 pt-6">
        <nav className="w-full space-y-6">
          {items.map((item, index) => (
            <SidebarSection key={index} item={item} />
          ))}
        </nav>
      </div>
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
    <ul className={cn("grid gap-1", level > 0 && "pl-4 border-l ml-2")}>
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
      <CollapsibleContent>
        <div className="pt-1">
          <SidebarTree items={item.items} level={level + 1} />
        </div>
      </CollapsibleContent>
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
        "w-full justify-start h-8 px-2 text-sm font-normal text-muted-foreground transition-colors",
        item.active && "bg-accent text-primary font-medium",
        "hover:bg-accent/80 hover:text-accent-foreground",
      )}
      nativeButton={false}
      render={
        <Link href={item.href} target={item.external ? "_blank" : undefined}>
          {Icon && <Icon className="mr-2 h-4 w-4 shrink-0" />}
          <span className="truncate">{item.label}</span>

          {item.status === "new" && (
            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
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
