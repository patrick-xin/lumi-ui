"use client";

import { useTranslations } from "next-intl";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/blocks/page-header";
import { PageNav } from "@/components/blocks/page-nav";
import { registryComponentCategories } from "@/lib/categories";

export function WidgetsHeader() {
  const t = useTranslations("Widgets");
  return (
    <PageHeader>
      <PageHeaderHeading>{t("title")}</PageHeaderHeading>
      <PageHeaderDescription>{t("description")}</PageHeaderDescription>
      <PageNav
        id="components"
        items={registryComponentCategories.map((category) => ({
          href: `/widgets/${category.slug}`,
          title: t(category.slug),
        }))}
      />
    </PageHeader>
  );
}
