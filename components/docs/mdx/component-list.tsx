import Link from "next/link";
import { FOLDERS_WITH_STATUS, NON_CLICKABLE_STATUSES } from "@/lib/constants";
import { getTreeWithStatus } from "@/lib/get-tree-with-status";
import { source } from "@/lib/source";
import { cn } from "@/lib/utils";
import type { DocPageNode } from "@/types";

export function ComponentList() {
  const treeWithStatus = getTreeWithStatus(source.pageTree);

  return (
    <div className="h-full w-full -mx-4 py-6 xl:py-10">
      {treeWithStatus.children
        .filter((c) => c.name === "Components")
        .map((item) => (
          <div key={item.$id}>
            {item.type === "folder" && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-8">
                {item.children.map((child) => {
                  if (child.type !== "page") return null;

                  const pageNode = child as DocPageNode;
                  const shouldShowStatus = FOLDERS_WITH_STATUS.includes(
                    item.name as string,
                  );

                  return (
                    <NavItem
                      key={child.$id}
                      child={pageNode}
                      shouldShowStatus={shouldShowStatus}
                    />
                  );
                })}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

interface NavItemProps {
  child: DocPageNode;
  isActive?: boolean;
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
          "relative inline-flex items-center px-4 pointer-events-none",
          "text-foreground/30",
        )}
      >
        {child.name}
      </span>
    );
  }

  return (
    <Link
      className={cn(
        "relative text-muted-foreground inline-flex items-center px-4",
        "hover:text-primary transition-colors ease-linear gap-2",
        isActive && "text-primary",
      )}
      href={child.url}
    >
      <span>{child.name}</span>
      {status === "new" && (
        <span className="inline-block size-2 mt-[2px] rounded-full bg-primary" />
      )}
    </Link>
  );
}
