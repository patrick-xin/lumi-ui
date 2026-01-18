import { Button } from "@lumi-ui/ui/button";
import type { Metadata } from "next";
import Link from "next/link";
import { BlocksNav } from "@/components/blocks/blocks-nav";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/blocks/page-header";
import { PageNav } from "@/components/blocks/page-nav";

const title = "Component Blocks";
const description =
  "A collection of high-level components ready for immediate integration.";

export const metadata: Metadata = {
  description,
  openGraph: {
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title,
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
  title,
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title,
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
};

export default function BlocksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
        <PageActions>
          <Button
            nativeButton={false}
            render={<a href="#blocks">Browse Blocks</a>}
            size="lg"
          />
        </PageActions>
      </PageHeader>
      <PageNav id="blocks">
        <BlocksNav />
        <Button
          className="mr-7 hidden shadow-none lg:flex"
          nativeButton={false}
          render={<Link href="/blocks/sidebar">Browse all blocks</Link>}
          size="sm"
          variant="secondary"
        />
      </PageNav>
      <div className="container-wrapper section-soft flex-1 md:py-12">
        <div className="container">{children}</div>
      </div>
    </>
  );
}
