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
    <div className="container relative md:grid md:grid-cols-[minmax(200px,240px)_1fr] xl:grid-cols-[minmax(220px,260px)_1fr]">
      <DocsSidebar tree={treeWithStatus} />
      {children}
    </div>
  );
}
