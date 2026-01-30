import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
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
  title,
};

export default async function BlocksLayout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
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
