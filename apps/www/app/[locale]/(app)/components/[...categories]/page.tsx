import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ComponentPreview } from "@/components/docs/mdx/component-preview";
import { getRegistryComponents } from "@/lib/blocks";
import { registryComponentCategories } from "@/lib/categories";
import { routing } from "@/lib/i18n/routing";
import type { ComponentName } from "@/registry/__registry";

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
    <div className="grid gap-16 md:gap-32 max-w-6xl mx-auto">
      {components.map((component) => (
        <div className="space-y-4" id={component.name} key={component.name}>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight">
              {component.title || component.name}
            </h2>
            {component.description && (
              <p className="text-muted-foreground text-sm max-w-2xl text-pretty">
                {component.description}
              </p>
            )}
          </div>
          <ComponentPreview name={component.name as ComponentName} />
        </div>
      ))}
    </div>
  );
}
