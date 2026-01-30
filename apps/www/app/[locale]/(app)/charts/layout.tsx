import type { Metadata } from "next";
import Link from "next/link";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/blocks/page-header";
import { Button } from "@/registry/ui/button";

const title = "Charts";
const description =
  "A collection of ready-to-use chart components built with Recharts V3.";

export const metadata: Metadata = {
  description,
  title,
};

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
        <Button
          nativeButton={false}
          render={<Link href="/docs/components/display-media/chart" />}
          variant="glow"
        >
          Documentation
        </Button>
      </PageHeader>
      <div className="container">{children}</div>
    </>
  );
}
