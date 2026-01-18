import { Separator } from "@lumi-ui/ui/separator";
import Link from "next/link";
import { FOLDERS_WITH_STATUS, NON_CLICKABLE_STATUSES } from "@/lib/constants";
import { getTreeWithStatus } from "@/lib/get-tree-with-status";
import { source } from "@/lib/source";
import { cn } from "@/lib/utils";
import type { DocFolderNode, DocNode, DocPageNode } from "@/types";

export function ComponentList({ locale }: { locale: "en" | "cn" }) {
  const tree = source.getPageTree(locale);
  const treeWithStatus = getTreeWithStatus(tree);
  const componentsNode = treeWithStatus.children.find(
    (node) => node.name === "Components" || node.name === "组件",
  );

  if (!componentsNode || componentsNode.type !== "folder") return null;

  const directPages = componentsNode.children.filter(
    (child): child is DocPageNode => child.type === "page",
  );

  const categories = componentsNode.children.filter(
    (child): child is DocFolderNode => child.type === "folder",
  );

  const showStatus = FOLDERS_WITH_STATUS.includes(
    componentsNode.name as string,
  );

  return (
    <div className="w-full py-6 xl:py-10 space-y-12">
      {directPages.length > 0 && (
        <ComponentGrid items={directPages} showStatus={showStatus} />
      )}
      {categories.map((category) => (
        <div className="space-y-6" key={category.$id}>
          <h2 className="text-lg lg:text-xl font-semibold tracking-tight text-foreground">
            {category.name}
          </h2>
          <ComponentGrid items={category.children} showStatus={showStatus} />
          <Separator />
        </div>
      ))}
    </div>
  );
}

function ComponentGrid({
  items,
  showStatus,
}: {
  items: DocNode[];
  showStatus: boolean;
}) {
  const pageNodes = items.filter(
    (item): item is DocPageNode => item.type === "page",
  );

  if (pageNodes.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-8">
      {pageNodes.map((page) => (
        <NavItem child={page} key={page.$id} shouldShowStatus={showStatus} />
      ))}
    </div>
  );
}

interface NavItemProps {
  child: DocPageNode;
  shouldShowStatus: boolean;
}

function NavItem({ child, shouldShowStatus }: NavItemProps) {
  const status = child.status;
  const isNonClickable =
    shouldShowStatus && status && NON_CLICKABLE_STATUSES.includes(status);

  if (isNonClickable) {
    return (
      <span
        className={cn(
          "relative inline-flex items-center justify-between px-4 py-2 text-sm font-medium rounded-md bg-muted/50 text-muted-foreground/50 cursor-not-allowed select-none",
        )}
      >
        <span>{child.name}</span>
        {shouldShowStatus && status === "planned" && (
          <span className="text-[10px] font-medium opacity-70">Planned</span>
        )}
      </span>
    );
  }

  return (
    <Link
      className={cn(
        "group relative inline-flex items-center justify-between px-4 py-2 text-sm font-medium transition-all duration-200",
        "rounded-md bg-background text-muted-foreground",
        "hover:text-foreground",
      )}
      href={child.url}
    >
      <span>{child.name}</span>
      {shouldShowStatus && status === "new" && (
        <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
      )}
      {shouldShowStatus && status === "in-progress" && (
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500/70" />
      )}
    </Link>
  );
}
