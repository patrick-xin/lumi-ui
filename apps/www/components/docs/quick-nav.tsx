import type { Item } from "fumadocs-core/page-tree";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/registry/ui/button";

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
          variant="glow"
          size="icon-sm"
          render={
            <Link href={neighbours.previous.url}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Link>
          }
        />
      )}
      {neighbours.next && (
        <Button
          nativeButton={false}
          variant="glow"
          size="icon-sm"
          render={
            <Link href={neighbours.next.url}>
              <span className="sr-only">Next</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
      )}
    </nav>
  );
};
