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
      className={cn(className, hideLineNumbers && "hide-line-numbers")}
      data-rehype-pretty-code-figure=""
    >
      {title && (
        <figcaption
          className="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70"
          data-language={"tsx"}
          data-rehype-pretty-code-title=""
        >
          {title}
        </figcaption>
      )}
      <CopyButton
        className="absolute top-1.5 right-2"
        code={code}
        variant="glow"
      />
      {highlightedCode}
    </figure>
  );
}
