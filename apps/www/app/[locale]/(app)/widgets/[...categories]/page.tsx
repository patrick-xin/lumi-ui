import { Button } from "@lumi-ui/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ComponentView } from "@/components/blocks/component-view";
import { ComponentSourceCode } from "@/components/docs/mdx/component-source-code";
import { getRegistryComponents } from "@/lib/blocks";
import { registryComponentCategories } from "@/lib/categories";
import { routing } from "@/lib/i18n/routing";
import type { ComponentName, RegistryName } from "@/registry/__registry";

export const revalidate = false;
export const dynamicParams = false;

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    registryComponentCategories.map((category) => ({
      categories: [category.slug],
      locale,
    })),
  );
}

interface PageProps {
  params: Promise<{ locale: string; categories: string[] }>;
}

export default async function ComponentsPage({ params }: PageProps) {
  const { categories, locale } = await params;
  setRequestLocale(locale);

  const category = registryComponentCategories.find(
    (category) => category.slug === categories[0],
  );

  if (!category) {
    return notFound();
  }

  const components = await getRegistryComponents(category.slug);

  return (
    <div className="grid gap-16 md:gap-32 max-w-6xl mx-auto scroll-mt-24">
      {components.map((component) => (
        <ComponentView
          description={component.description}
          iframeHeight={component.meta?.iframeHeight as number | string}
          key={component.name}
          name={component.name as ComponentName}
          source={
            <ComponentSourceCode
              className="bg-transparent"
              collapsible={false}
              name={component.name as RegistryName}
            />
          }
          title={component.title}
        />
      ))}
      <div className="flex justify-center py-6">
        <Button
          nativeButton={false}
          render={<Link href="/widgets">Browse more components</Link>}
          variant="glow"
        />
      </div>
    </div>
  );
}
