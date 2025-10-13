import { findNeighbour } from "fumadocs-core/server";
import { notFound } from "next/navigation";
import { DocsActions } from "@/components/docs/docs-actions";
import { DocsReferences } from "@/components/docs/docs-references";
import { DocsQuickNav } from "@/components/docs/quick-nav";
import { DesktopToc } from "@/components/docs/toc/desktop-toc";
import { MobileToc } from "@/components/docs/toc/mobile-toc";
import { source } from "@/lib/source";
import { absoluteUrl } from "@/lib/utils";
import { mdxComponents } from "@/mdx-components";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return source.generateParams();
}

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) {
    notFound();
  }

  const doc = page.data;
  const MDX = doc.body;
  const links = doc.links;
  const neighbours = findNeighbour(source.pageTree, page.url, {
    separateRoot: true,
  });

  return (
    <div className="relative grid xl:grid-cols-[minmax(0,1fr)_minmax(200px,260px)] xl:gap-12 2xl:gap-16">
      <div className="min-w-0 py-4">
        <article className="max-w-[70ch] mx-auto pt-12 lg:pt-0 space-y-8">
          <header className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
                {doc.title}
              </h1>
              <div className="bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center justify-between gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:backdrop-blur-none sm:justify-between">
                <DocsActions slug={params.slug} url={absoluteUrl(page.url)} />
                <DocsQuickNav neighbours={neighbours} />
              </div>
            </div>
            {doc.description && (
              <p className="text-lg text-muted-foreground">{doc.description}</p>
            )}
            <DocsReferences links={links} />
          </header>

          <MDX components={mdxComponents} />
        </article>
      </div>
      {doc.toc && doc.toc.length > 0 && (
        <>
          <aside className="hidden lg:block lg:sticky top-(--header-height) pt-12 h-[calc(100dvh-var(--header-height))] shrink-0">
            <DesktopToc toc={doc.toc} />
          </aside>
          <div className="lg:hidden">
            <MobileToc items={doc.toc} />
          </div>
        </>
      )}
    </div>
  );
}
