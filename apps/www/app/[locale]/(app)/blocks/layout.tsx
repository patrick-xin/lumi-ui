import type { Metadata } from "next";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/blocks/page-header";
import { PageNav } from "@/components/blocks/page-nav";
import { registryBlockCategories } from "@/lib/categories";

const title = "Composition Library";
const description =
  "Curated UI compositions that combine multiple components into proven, production-ready patterns. Designed for real-world flows, accessibility, and scale.";

export const metadata: Metadata = {
  description,
  openGraph: {
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title,
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
  title,
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title,
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
};

export default function BlocksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
        <PageNav
          id="blocks"
          items={[
            { href: "/blocks", title: "Featured" },
            ...registryBlockCategories.map((category) => ({
              href: `/blocks/${category.slug}`,
              title: category.name,
            })),
          ]}
        />
      </PageHeader>
      <div className="container">{children}</div>
    </>
  );
}
