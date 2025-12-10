import { DocsSidebar } from "@/components/docs/sidebar";
import { getTreeWithStatus } from "@/lib/get-tree-with-status";
import { source } from "@/lib/source";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const treeWithStatus = getTreeWithStatus(source.pageTree);

  return (
    <div className="container relative flex-1">
      <DocsSidebar tree={treeWithStatus} />
      <div className="md:grid md:grid-cols-[minmax(200px,240px)_1fr] xl:grid-cols-[minmax(240px,320px)_1fr]">
        <div className="hidden md:block" />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
