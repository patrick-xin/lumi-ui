import { findNeighbour } from "fumadocs-core/page-tree";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { DocsAritcleFooter } from "@/components/docs/docs-article-footer";
import { DocsAritcleHeader } from "@/components/docs/docs-article-header";
import { Callout } from "@/components/docs/mdx/call-out";
import { DocsToc } from "@/components/docs/toc";
import { source } from "@/lib/source";
import { absoluteUrl } from "@/lib/utils";
import { mdxComponents } from "@/mdx-components";
export const revalidate = false;
export const dynamicParams = false;

export function generateStaticParams() {
  return source.generateParams().map((param) => ({
    slug: param.slug,
    locale: param.lang,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) {
    notFound();
  }

  const doc = page.data;

  if (!doc.title || !doc.description) {
    notFound();
  }

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: absoluteUrl(page.url),
      images: [
        {
          url: `/og?title=${encodeURIComponent(
            doc.title,
          )}&description=${encodeURIComponent(doc.description)}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [
        {
          url: `/og?title=${encodeURIComponent(
            doc.title,
          )}&description=${encodeURIComponent(doc.description)}`,
        },
      ],
      creator: "@alpesdream",
    },
  };
}

interface PageProps {
  params: Promise<{ locale: string; slug?: string[] }>;
}

export default function Page(props: PageProps) {
  const params = use(props.params);
  setRequestLocale(params.locale);
  const page = source.getPage(params.slug, params.locale);
  if (!page) {
    notFound();
  }

  const doc = page.data;
  const MDX = doc.body;
  const links = doc.links;
  const tree = source.getPageTree(params.locale);

  const neighbours = findNeighbour(tree, page.url, {
    separateRoot: true,
  });

  return (
    <div className="relative grid xl:grid-cols-[minmax(0,1fr)_minmax(200px,240px)] xl:gap-12 2xl:gap-16 scroll-mt-20">
      <div className="min-w-0 py-4 rounded-md pt-12 xl:pt-4">
        <article className="max-w-[75ch] mx-auto lg:pt-0 space-y-8 px-0 lg:px-6">
          <DocsAritcleHeader
            description={doc.description}
            links={links}
            neighbours={neighbours}
            title={doc.title}
            slug={params.slug}
            url={page.url}
          />
          {doc.status === "in-progress" && (
            <Callout variant="warning" className="[&_p]:m-0">
              This component is currently in progress. The API and
              implementation details may change.
            </Callout>
          )}
          <MDX components={mdxComponents} />
          <DocsAritcleFooter neighbours={neighbours} />
        </article>
      </div>
      <DocsToc toc={doc.toc} />
    </div>
  );
}
