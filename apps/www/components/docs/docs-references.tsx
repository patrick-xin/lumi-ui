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
        <Badge variant="outline">
          <Link
            className="inline-flex items-center gap-1"
            href={links.doc}
            rel="noopener noreferrer"
            target="_blank"
          >
            Docs
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </Badge>
      )}
      {links.api && (
        <Badge variant="outline">
          <Link
            className="inline-flex items-center gap-1"
            href={links.api}
            rel="noopener noreferrer"
            target="_blank"
          >
            API Reference
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </Badge>
      )}
    </div>
  );
};
