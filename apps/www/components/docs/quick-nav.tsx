import { Button } from "@lumi-ui/ui/button";
import type { Item } from "fumadocs-core/page-tree";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface DocsQuickNavProps {
  neighbours: {
    previous?: Item;
    next?: Item;
  };
}

export const DocsQuickNav = ({ neighbours }: DocsQuickNavProps) => {
  return (
    <nav aria-label="Quick page navigation" className="flex gap-2">
      {neighbours.previous && (
        <Button
          nativeButton={false}
          render={
            <Link href={neighbours.previous.url}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Link>
          }
          size="icon-sm"
          variant="glow"
        />
      )}
      {neighbours.next && (
        <Button
          nativeButton={false}
          render={
            <Link href={neighbours.next.url}>
              <span className="sr-only">Next</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
          size="icon-sm"
          variant="glow"
        />
      )}
    </nav>
  );
};
