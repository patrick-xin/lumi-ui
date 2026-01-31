"use client";

import { useTranslations } from "next-intl";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/blocks/page-header";
import { PageNav } from "@/components/blocks/page-nav";
import { registryBlockCategories } from "@/lib/categories";
export function BlocksHeader() {
  const t = useTranslations("Blocks");
  return (
    <PageHeader>
      <PageHeaderHeading>{t("title")}</PageHeaderHeading>
      <PageHeaderDescription>{t("description")}</PageHeaderDescription>
      <PageNav
        id="blocks"
        items={[
          { href: "/blocks", title: t("featured") },
          ...registryBlockCategories.map((category) => ({
            href: `/blocks/${category.slug}`,
            title: t(category.slug),
          })),
        ]}
      />
    </PageHeader>
  );
}
