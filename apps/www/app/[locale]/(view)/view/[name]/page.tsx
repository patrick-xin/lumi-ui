import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { routing } from "@/lib/i18n/routing";
import { absoluteUrl } from "@/lib/utils";
import { components } from "@/registry/__index__";
import type { RegistryName } from "@/registry/__registry";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const names = Object.keys(components) as RegistryName[];
  return routing.locales.flatMap((locale) =>
    names
      .filter((name) => {
        const item = components[name];
        return ["registry:block"].includes(item.type);
      })
      .map((name) => ({
        locale,
        name,
      })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: string;
    name: string;
  }>;
}): Promise<Metadata> {
  const { name } = await params;
  const component = components[name as RegistryName];

  if (!component) {
    return {};
  }

  const title = component.name;
  const description = component.description;

  return {
    description,
    openGraph: {
      description,
      images: [
        {
          alt: siteConfig.name,
          height: 630,
          url: siteConfig.ogImage,
          width: 1200,
        },
      ],
      title,
      type: "article",
      url: absoluteUrl(`/view/${name}`),
    },
    title,
    twitter: {
      card: "summary_large_image",
      creator: "@shadcn",
      description,
      images: [siteConfig],
      title,
    },
  };
}

export default async function BlockPage({
  params,
}: {
  params: Promise<{
    locale: string;
    name: string;
  }>;
}) {
  const { name } = await params;
  const component = components[name as RegistryName];

  const Component = component.component;

  if (!Component) {
    return notFound();
  }
  return (
    <div className="relative flex h-screen w-full flex-col bg-background">
      <Component />
    </div>
  );
}
