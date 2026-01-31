import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { WidgetsHeader } from "@/components/site/widgets-header";

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
      <WidgetsHeader />

      <div className="container">{children}</div>
    </>
  );
}
