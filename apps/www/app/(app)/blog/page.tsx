import Link from "next/link";
import { BlogBanner } from "@/components/blog/banner";
import BlogCard from "@/components/blog/blog-card";
import { blogSource } from "@/lib/source";

export default function Page(): React.ReactElement {
  const posts = [...blogSource.getPages()].sort(
    (a, b) =>
      new Date(b.data.date ?? 0).getTime() -
      new Date(a.data.date ?? 0).getTime(),
  );

  return (
    <div className="container min-h-screen my-6 lg:my-10 flex flex-col gap-6 md:gap-10">
      <BlogBanner />
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.map((post) => (
          <Link key={post.url} href={post.url}>
            <BlogCard
              src={post.data.image}
              title={post.data.title}
              publishDate={post.data.date as string}
              category={post.data.category}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
