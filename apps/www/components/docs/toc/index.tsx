import type { TOCItemType } from "fumadocs-core/toc";
import { DesktopToc } from "./desktop-toc";
import { MobileToc } from "./mobile-toc";

type DocsTocProps = {
  toc: TOCItemType[];
};

export function DocsToc({ toc }: DocsTocProps) {
  return (
    <>
      {toc && toc.length > 0 && (
        <>
          <DesktopToc
            className="hidden lg:block lg:sticky top-[var(--header-height)] pt-12 h-[calc(100dvh-var(--header-height))] shrink-0"
            toc={toc}
          />

          <MobileToc className="lg:hidden" items={toc} />
        </>
      )}
    </>
  );
}
