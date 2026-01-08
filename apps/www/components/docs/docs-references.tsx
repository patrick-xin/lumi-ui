import { Button } from "@lumi-ui/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

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
        <Button
          className="h-5.5 justify-between text-xs text-muted-foreground"
          nativeButton={false}
          render={
            <Link
              className="inline-flex items-center gap-1"
              href={links.doc}
              rel="noopener noreferrer"
              target="_blank"
            >
              Docs
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          }
          variant="glow"
        />
      )}
      {links.api && (
        <Button
          className="h-5.5 justify-between text-muted-foreground text-xs"
          nativeButton={false}
          render={
            <Link
              className="inline-flex items-center gap-1"
              href={links.api}
              rel="noopener noreferrer"
              target="_blank"
            >
              API Reference
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          }
          variant="glow"
        />
      )}
    </div>
  );
};
