import Link from "next/link";
import { ComponentView } from "@/components/blocks/component-view";
import { ComponentSourceCode } from "@/components/docs/mdx/component-source-code";
import { components } from "@/registry/__index__";
import type { ComponentName, RegistryName } from "@/registry/__registry";
import { Button } from "@/registry/ui/button";

export const dynamic = "force-static";

const FEATURED_COMPONENTS = [
  "vercel-notification",
  "morphing-dialog",
] as ComponentName[];

async function getFeaturedComponents() {
  const featuredData = await Promise.all(
    FEATURED_COMPONENTS.map(async (name) => {
      return components[name];
    }),
  );

  return featuredData.filter(Boolean);
}

export default async function Page() {
  const featured = await getFeaturedComponents();

  return (
    <div className="grid gap-16 md:gap-32 max-w-6xl mx-auto scroll-mt-24">
      {featured.length > 0 &&
        featured.map((component) => (
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
