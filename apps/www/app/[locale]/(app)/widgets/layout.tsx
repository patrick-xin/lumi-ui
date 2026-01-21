import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/blocks/page-header";
import { PageNav } from "@/components/blocks/page-nav";
import { registryComponentCategories } from "@/lib/categories";
import type { Metadata } from "next";

const title = "Component Lab";
const description =
  "Precision-engineered UI patterns for high-performance applications. Sophisticated, accessible, and ready for production out of the box.";

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
            title: category.name,
            href: `/widgets/${category.slug}`,
          }))}
        />
      </PageHeader>

      <div className="container">{children}</div>
    </>
  );
}
