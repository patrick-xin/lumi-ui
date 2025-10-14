import type { Item } from "fumadocs-core/page-tree";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";

interface DocsAritcleFooterProps {
  neighbours: {
    previous?: Item;
    next?: Item;
  };
}

export const DocsAritcleFooter = ({ neighbours }: DocsAritcleFooterProps) => {
  const hasNext = neighbours.next;
  const hasPrevious = neighbours.previous;
  return (
    <footer>
      <nav
        aria-label="Previous and next pages"
        className={cn(
          "sm:flex hidden items-center gap-4 h-16",
          hasNext && hasPrevious
            ? "justify-between"
            : hasPrevious
              ? "justify-start"
              : "justify-end",
        )}
      >
        {neighbours.previous && (
          <Button
            variant="outline"
            size="sm"
            className="justify-end"
            render={
              <Link href={neighbours.previous.url}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="truncate">{neighbours.previous.name}</span>
              </Link>
            }
          />
        )}

        {neighbours.next && (
          <Button
            variant="outline"
            size="sm"
            className="justify-end"
            render={
              <Link href={neighbours.next.url}>
                <span className="truncate">{neighbours.next.name}</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            }
          />
        )}
      </nav>
    </footer>
  );
};
