import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
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
  title,
};

export default async function ComponentsLayout({
  children,
  params,
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
