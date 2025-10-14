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
            toc={toc}
            className="hidden xl:block lg:sticky top-(--header-height) pt-12 h-[calc(100dvh-var(--header-height))] shrink-0"
          />

          <MobileToc items={toc} className="xl:hidden" />
        </>
      )}
    </>
  );
}
