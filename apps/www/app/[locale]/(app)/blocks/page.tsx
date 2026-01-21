import { BlockDisplay } from "@/components/blocks/block-display";
import { getBlocks } from "@/lib/blocks";
import type { Block } from "@/types";
import { Button } from "@lumi-ui/ui/button";
import Link from "next/link";

export const dynamic = "force-static";

const FEATURED_BLOCKS = ["dialog-01", "sidebar-01"];

async function getFeaturedBlocks() {
  const featuredData = await Promise.all(
    FEATURED_BLOCKS.map(async (blockId) => {
      const categorySlug = blockId.split("-")[0];
      const blocks = await getBlocks(categorySlug);
      return blocks.find((b) => b.name === blockId);
    }),
  );

  return featuredData.filter(Boolean) as Block[];
}

export default async function Page() {
  const featured = await getFeaturedBlocks();
  return (
    <div className="flex flex-col gap-12 md:gap-24">
      {featured.length > 0 &&
        featured.map((block) => (
          <BlockDisplay block={block} key={block.name} />
        ))}
        <div className="container flex justify-center py-6">
          <Button
            nativeButton={false}
            render={<Link href="/blocks/sidebar">Browse more blocks</Link>}
            variant="glow"
          />
        </div>
    </div>
  );
}
