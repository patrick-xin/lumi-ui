import { findNeighbour } from "fumadocs-core/server";
import { notFound } from "next/navigation";
import { DocsAritcleFooter } from "@/components/docs/docs-article-footer";
import { DocsAritcleHeader } from "@/components/docs/docs-article-header";
import { DocsToc } from "@/components/docs/toc";
import { source } from "@/lib/source";
import { absoluteUrl } from "@/lib/utils";
import { mdxComponents } from "@/mdx-components";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return source.generateParams();
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
          <DocsAritcleHeader
            description={doc.description}
            links={links}
            neighbours={neighbours}
            title={doc.title}
            slug={params.slug}
            url={page.url}
          />
          <MDX components={mdxComponents} />
          <DocsAritcleFooter neighbours={neighbours} />
        </article>
      </div>
      <DocsToc toc={doc.toc} />
    </div>
  );
}
