import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { BlocksHeader } from "@/components/site/blocks-header";

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
      <BlocksHeader />
      <div className="container">{children}</div>
    </>
  );
}
