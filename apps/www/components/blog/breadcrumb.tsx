import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@lumi-ui/ui/breadcrumb";
import Link from "next/link";

export const BlogBreadcrumb = ({ title }: { title: string }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="text-sm">
          <BreadcrumbLink render={<Link href="/blog">Blog</Link>} />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="text-sm">
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
