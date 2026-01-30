import type { Metadata } from "next";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/blocks/page-header";
import { PageNav } from "@/components/blocks/page-nav";
import { registryComponentCategories } from "@/lib/categories";

const title = "Component Lab";
const description =
  "Precision-engineered UI components built for correctness, accessibility, and performance. Composable by design and ready for production use.";

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

export default function ComponentsLayout({
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
          id="components"
          items={registryComponentCategories.map((category) => ({
            href: `/widgets/${category.slug}`,
            title: category.name,
          }))}
        />
      </PageHeader>

      <div className="container">{children}</div>
    </>
  );
}
