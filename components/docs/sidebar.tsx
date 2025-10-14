"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { ComponentStatus, DocPageNode, DocRoot } from "@/types";

interface DocsSidebarNavProps {
  tree: DocRoot;
}

const FOLDERS_WITH_STATUS = ["Components"];
const NON_CLICKABLE_STATUSES: ComponentStatus[] = ["planned", "in-progress"];

export const DocsSidebarNav = ({ tree }: DocsSidebarNavProps) => {
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
          "relative inline-flex items-center pl-4 text-sm pointer-events-none",
          "text-foreground/30",
        )}
      >
        {child.name}
        <StatusBadge status={status} />
      </span>
    );
  }

  return (
    <Link
      className={cn(
        "relative text-muted-foreground inline-flex items-center pl-4 text-sm",
        "hover:text-primary transition-colors ease-linear",
        isActive && "text-primary",
      )}
      href={child.url}
    >
      <span>{child.name}</span>
      {shouldShowStatus && status && <StatusBadge status={status} />}
    </Link>
  );
}

function StatusBadge({ status }: { status?: ComponentStatus }) {
  if (!status) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center ml-2 text-[10px] px-2 py-0.5 rounded-md",
        // status === "planned" && "border-amber-800 border text-amber-600",
        //status === "new" && "border-green-800 text-green-600",
        // status === "in-progress" && "border-pink-600 border text-pink-500",
      )}
    >
      {/* {status} */}
    </span>
  );
}
