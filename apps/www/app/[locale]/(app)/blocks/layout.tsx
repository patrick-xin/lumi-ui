import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading
} from "@/components/blocks/page-header";
import { PageNav } from "@/components/blocks/page-nav";
import { registryBlockCategories } from "@/lib/categories";
import type { Metadata } from "next";

const title = "Component Blocks";
const description =
  "A collection of high-level components ready for immediate integration.";

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
            { title: "Featured", href: "/blocks" },
            ...registryBlockCategories.map((category) => ({
              title: category.name,
              href: `/blocks/${category.slug}`,
            })),
          ]}
        />
      </PageHeader>
      <div className="container">{children}</div>
    </>
  );
}
