import type * as React from "react";
import { CopyButton } from "@/components/docs/copy-button";
import { cn } from "@/lib/utils";

interface CodeBlockWrapperProps extends React.ComponentProps<"figure"> {
  title?: string;
  icon?: React.ReactNode;
  code: string;
  language?: string;
  children: React.ReactNode;
}

export function CodeBlockWrapper({
  title,
  icon,
  code,
  language = "tsx",
  children,
  className,
  ...props
}: CodeBlockWrapperProps) {
  const hasCaption = !!title || !!icon;

  return (
    <figure
      className={cn(
        "relative flex flex-col rounded-md w-full max-w-full",
        className,
      )}
      data-language={language}
      data-rehype-pretty-code-figure=""
      {...props}
    >
      {hasCaption ? (
        <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-code text-code-foreground px-4 py-2 h-12">
          <figcaption className="[&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70">
            {icon}
            <span className="truncate">{title}</span>
          </figcaption>
          <div className="pl-4">
            <CopyButton code={code} variant="glow" />
          </div>
        </div>
      ) : (
        <div className="sticky top-0 z-20 flex justify-end h-0 w-full pointer-events-none overflow-visible">
          <div className="mt-2 mr-2 pointer-events-auto">
            <CopyButton code={code} variant="glow" />
          </div>
        </div>
      )}

      {children}
    </figure>
  );
}
