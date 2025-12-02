import type { Item } from "fumadocs-core/page-tree";
import { absoluteUrl } from "@/lib/utils";
import { DocsActions } from "./docs-actions";
import { DocsReferences } from "./docs-references";
import { DocsQuickNav } from "./quick-nav";

type DocsAritcleHeaderProps = {
  title: string;
  slug?: string[];
  url: string;
  description: string | undefined;
  neighbours: {
    previous?: Item;
    next?: Item;
  };
  links:
    | {
        doc?: string | undefined;
        api?: string | undefined;
      }
    | undefined;
};

export function DocsAritcleHeader({
  title,
  description,
  neighbours,
  slug,
  url,
  links,
}: DocsAritcleHeaderProps) {
  return (
    <header className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
          {title}
        </h1>
        <div className="bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center justify-between gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:backdrop-blur-none sm:justify-between">
          <DocsActions slug={slug} url={absoluteUrl(url)} />
          <DocsQuickNav neighbours={neighbours} />
        </div>
      </div>
      {description && (
        <p className="text-lg text-muted-foreground">{description}</p>
      )}
      <DocsReferences links={links} />
    </header>
  );
}
