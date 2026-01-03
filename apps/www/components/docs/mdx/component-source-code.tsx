import fs from "node:fs/promises";
import path from "node:path";
import { rewriteRegistryImports } from "@/lib/rewrite-imports";
import { components } from "@/registry/__index__";
import type { RegistryName } from "@/registry/__registry";
import { CodeBlock } from "./code-block";
import { CodeCollapsibleWrapper } from "./collapsible-wrapper";

export async function ComponentSourceCode({
  name,
  title,
  language,
  collapsible = true,
  className,
}: React.ComponentProps<"div"> & {
  name: RegistryName;
  title?: string;
  language?: string;
  collapsible?: boolean;
}) {
  if (!name) {
    return null;
  }

  const lang = language ?? title?.split(".").pop() ?? "tsx";

  const { files } = components[name];

  const originalCode = await fs.readFile(
    path.join(process.cwd(), files[0].path),
    "utf-8",
  );
  const code = rewriteRegistryImports(originalCode);

  if (!collapsible) {
    return <CodeBlock code={code} lang={lang} title={title || `${name}.tsx`} />;
  }

  return (
    <CodeCollapsibleWrapper className={className}>
      <CodeBlock code={code} lang={lang} title={title || `${name}.tsx`} />
    </CodeCollapsibleWrapper>
  );
}
