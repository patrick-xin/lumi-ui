import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { BlockDisplay } from "@/components/blocks/block-display";
import { getBlocks } from "@/lib/blocks";
import { registryBlockCategories } from "@/lib/categories";
import { routing } from "@/lib/i18n/routing";

export const revalidate = false;
export const dynamicParams = false;

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    registryBlockCategories.map((category) => ({
      categories: [category.slug],
      locale,
    })),
  );
}

interface PageProps {
  params: Promise<{ locale: string; categories: string[] }>;
}

export default async function BlocksPage({ params }: PageProps) {
  const { categories, locale } = await params;
  setRequestLocale(locale);
  const category = registryBlockCategories.find(
    (category) => category.slug === categories[0],
  );

  if (!category) {
    return notFound();
  }

  const blocks = await getBlocks(category.slug);

  return (
    <div className="flex flex-col gap-12 md:gap-24">
      {blocks.map((block) => (
        <BlockDisplay block={block} key={block.name} />
      ))}
    </div>
  );
}
