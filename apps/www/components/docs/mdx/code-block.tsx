import { CopyButton } from "@/components/docs/copy-button";
import { highlightCode } from "@/lib/highlight-code";
import { cn } from "@/lib/utils";

export async function CodeBlock({
  code,
  title,
  lang,
  className,
  hideLineNumbers,
}: {
  code: string;
  title?: string;
  lang: string;
  className?: string;
  hideLineNumbers?: boolean;
}) {
  const highlightedCode = await highlightCode(code, lang, {
    lineNumbers: false,
  });

  return (
    <figure
      data-rehype-pretty-code-figure=""
      className={cn(className, hideLineNumbers && "hide-line-numbers")}
    >
      {title && (
        <figcaption
          data-rehype-pretty-code-title=""
          className="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70"
          data-language={"tsx"}
        >
          {title}
        </figcaption>
      )}
      <CopyButton
        variant="glow"
        className="absolute top-1.5 right-2"
        code={code}
      />
      {highlightedCode}
    </figure>
  );
}
