import { CodeBlockWrapper } from "@/components/code-block-wrapper";
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
    <CodeBlockWrapper
      className={cn(className, hideLineNumbers && "hide-line-numbers")}
      code={code}
      language={lang}
      title={title}
    >
      {highlightedCode}
    </CodeBlockWrapper>
  );
}
