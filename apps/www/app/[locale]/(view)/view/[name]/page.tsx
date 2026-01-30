import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { routing } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";
import { components } from "@/registry/__index__";
import type { RegistryName } from "@/registry/__registry";

export async function generateStaticParams() {
  const names = Object.keys(components) as RegistryName[];
  return routing.locales.flatMap((locale) =>
    names
      .filter((name) => {
        const item = components[name];
        return ["registry:block", "registry:component"].includes(item.type);
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
    title,
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
  const alignment = component.meta?.alignment;

  return (
    <div
      className={cn(
        "relative flex h-screen w-full flex-col bg-background",
        alignment === "top-right" && "items-end justify-start p-10",
        alignment === "bottom-center" && "items-center justify-end p-10",
        (!alignment || alignment === "center") && "items-center justify-center",
      )}
    >
      <Suspense
        fallback={
          <div className="h-screen w-screen flex justify-center items-center text-sm">
            Loading preview...
          </div>
        }
      >
        <Component />
      </Suspense>
    </div>
  );
}
