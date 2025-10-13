import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/registry/ui/badge";

interface DocsReferenceProps {
  links?: {
    doc?: string;
    api?: string;
  };
}

export const DocsReferences = ({ links }: DocsReferenceProps) => {
  if (!links?.doc && !links?.api) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {links.doc && (
        <Badge
          variant="secondary"
          render={
            <Link
              href={links.doc}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1"
            >
              Docs
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          }
        />
      )}
      {links.api && (
        <Badge
          variant="secondary"
          render={
            <Link
              href={links.api}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1"
            >
              API Reference
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          }
        />
      )}
    </div>
  );
};
