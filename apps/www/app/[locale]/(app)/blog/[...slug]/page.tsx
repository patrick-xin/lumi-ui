import { notFound } from "next/navigation";
import { BlogBreadcrumb } from "@/components/blog/breadcrumb";
import { blogSource } from "@/lib/source";
import { mdxComponents } from "@/mdx-components";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return blogSource.generateParams();
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const page = blogSource.getPage([slug]);

  if (!page) notFound();

  const MDX = page.data.body;

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(page.data.date));

  return (
    <div className="my-6 lg:my-10">
      <div className="flex flex-wrap items-center justify-between gap-4 max-w-3xl lg:mx-auto mx-4">
        <BlogBreadcrumb title={page.data.title} />
        <time className="text-muted-foreground text-xs">{formattedDate}</time>
      </div>
      <div className="container mx-auto max-w-[70ch] text-pretty lg:[&_p]:text-lg lg:[&_li]:text-lg">
        <h1 className="text-4xl lg:text-5xl font-bold my-6 lg:my-10">
          {page.data.title}
        </h1>
        <p className="text-muted-foreground text-lg">{page.data.description}</p>
        <MDX components={mdxComponents} />
      </div>
    </div>
  );
}
