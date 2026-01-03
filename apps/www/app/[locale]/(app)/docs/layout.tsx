import { setRequestLocale } from "next-intl/server";
import { DocsSidebar } from "@/components/docs/sidebar";
import { getTreeWithStatus } from "@/lib/get-tree-with-status";
import { source } from "@/lib/source";

export default async function DocsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tree = source.getPageTree(locale);
  const treeWithStatus = getTreeWithStatus(tree);
  setRequestLocale(locale);
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
