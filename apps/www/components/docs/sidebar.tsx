"use client";

import {
  SiGithub,
  SiShadcnui,
  SiTailwindcss,
} from "@icons-pack/react-simple-icons";
import { Badge } from "@lumi-ui/ui/badge";
import { Button } from "@lumi-ui/ui/button";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@lumi-ui/ui/collapsible";
import { ScrollArea } from "@lumi-ui/ui/scroll-area";
import { ChevronRight, CpuIcon, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { hasActiveChild, normalizeSidebarTree } from "@/lib/sidebar-utils";
import { cn } from "@/lib/utils";
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
            <SidebarSection item={item} key={String(index)} />
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
    <ul
      className={cn("grid gap-1 px-2 pt-1", level > 0 && "pl-4 border-l ml-2")}
    >
      {items.map((item) => (
        <li key={item.label}>
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
    <Collapsible className="group/collapsible" defaultOpen={true}>
      <CollapsibleTrigger
        render={
          <Button
            className={cn(
              "w-full justify-between h-8 px-2 text-sm font-semibold",
              isActiveFolder && "text-primary",
            )}
            size="sm"
            variant="ghost"
          >
            {item.label}
            <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[open]/collapsible:rotate-90" />
          </Button>
        }
      />
      <CollapsiblePanel>
        <SidebarTree items={item.items} level={level + 1} />
      </CollapsiblePanel>
    </Collapsible>
  );
};

const SidebarLink = ({ item }: { item: SidebarLinkItem }) => {
  const Icon = item.icon as LucideIcon;
  const isExternalUrl =
    item.href.startsWith("http") || item.href.startsWith("https");
  const isExternal = item.external || isExternalUrl;

  if (item.disabled) {
    return (
      <span className="flex h-8 w-full items-center px-2 text-sm text-muted-foreground/40 cursor-not-allowed">
        {item.label}
        {item.status === "planned" && (
          <Badge
            className="ml-auto text-[9px] font-medium text-muted-foreground/50"
            variant="outline"
          >
            Planned
          </Badge>
        )}
      </span>
    );
  }

  return (
    <Button
      className={cn(
        "w-full justify-start h-8 px-2 text-sm font-normal text-muted-foreground",
        item.active &&
          "bg-accent text-primary hover:bg-accent! hover:text-primary",
      )}
      nativeButton={false}
      render={
        <Link
          href={item.href}
          rel={isExternal ? "noreferrer noopener" : undefined}
          target={isExternal ? "_blank" : undefined}
        >
          {Icon && <Icon className="mr-2 size-4 shrink-0" />}
          <ThemeBadge theme={item.label.toLowerCase()} />
          <ResourceIcon name={item.label} />
          <span className="truncate">{item.label}</span>
          {item.status === "new" && (
            <span className="ml-auto size-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          )}
          {item.status === "planned" && (
            <span className="ml-auto size-1.5 rounded-full bg-muted-foreground/50" />
          )}
          {item.status === "in-progress" && (
            <span className="ml-auto size-1.5 rounded-full bg-amber-500/70" />
          )}
        </Link>
      }
      size="sm"
      variant="ghost"
    />
  );
};

const ThemeBadge = ({ theme }: { theme: string }) => {
  switch (theme) {
    case "dune":
      return (
        <div className="bg-[oklch(0.66_0.197_36)] size-1.5 rounded-full mr-2 shadow-[0_0_6px_oklch(0.66_0.197_36)]" />
      );
    case "canopy":
      return (
        <div className="bg-[oklch(0.72_0.18_128)] size-1.5 rounded-full mr-2 shadow-[0_0_6px_oklch(0.72_0.18_128)]" />
      );
    case "lagoon":
      return (
        <div className="bg-[oklch(0.55_0.15_180)] size-1.5 rounded-full mr-2 shadow-[0_0_6px_oklch(0.55_0.15_180)]" />
      );
    case "orchid":
      return (
        <div className="bg-[oklch(0.71_0.08_302)] size-1.5 rounded-full mr-2 shadow-[0_0_6px_oklch(0.71_0.08_302)]" />
      );
    case "celeste":
      return (
        <div className="bg-[oklch(0.72_0.14_265)] size-1.5 rounded-full mr-2 shadow-[0_0_6px_oklch(0.72_0.14_265)]" />
      );
    default:
      return null;
  }
};

const ResourceIcon = ({ name }: { name: string }) => {
  switch (name) {
    case "github":
      return <SiGithub className="mr-1.5 size-4" />;
    case "tailwindcss":
      return <SiTailwindcss className="mr-1.5 size-4" />;
    case "shadcn/ui":
      return <SiShadcnui className="mr-2.5 size-3" />;
    case "llms.txt":
      return <CpuIcon className="mr-1.5 size-4" />;
    case "base-ui":
      return (
        <div className="mr-1 ml-1 size-4">
          <svg
            aria-label="Base UI"
            fill="currentcolor"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <title>Base UI</title>
            <path d="M9.5001 7.01537C9.2245 6.99837 9 7.22385 9 7.49999V23C13.4183 23 17 19.4183 17 15C17 10.7497 13.6854 7.27351 9.5001 7.01537Z"></path>
            <path d="M8 9.8V12V23C3.58172 23 0 19.0601 0 14.2V12V1C4.41828 1 8 4.93989 8 9.8Z"></path>
          </svg>
        </div>
      );
    default:
      return null;
  }
};
