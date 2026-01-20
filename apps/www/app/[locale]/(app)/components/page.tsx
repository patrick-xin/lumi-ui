import { ComponentPreview } from "@/components/docs/mdx/component-preview";
import { components } from "@/registry/__index__";
import { ComponentName } from "@/registry/__registry";
import { Button } from "@lumi-ui/ui/button";
import Link from "next/link";

export const dynamic = "force-static";

const FEATURED_COMPONENTS = ["vercel-notification", "morphing-dialog"] as ComponentName[];

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
    <div className="flex flex-col gap-12 md:gap-24">
      {featured.length > 0 &&
        featured.map((component) => (
          <ComponentPreview key={component.name} name={component.name as ComponentName} />
        ))}
      <div className="container-wrapper">
        <div className="container flex justify-center py-6">
          <Button
            nativeButton={false}
            render={<Link href="/components/accordion">Browse more components</Link>}
            variant="glow"
          />
        </div>
      </div>
    </div>
  );
}
