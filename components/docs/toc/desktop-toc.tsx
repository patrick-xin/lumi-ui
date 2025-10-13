"use client";

import type { TOCItemType } from "fumadocs-core/toc";
import { TextAlignStartIcon } from "lucide-react";
import * as React from "react";
import { useTocActiveItem } from "@/hooks/use-toc-active-Item";
import { cn } from "@/lib/utils";

interface DocsTableOfContentsProps {
  toc: TOCItemType[];
  className?: string;
}

function getItemOffset(depth: number): number {
  if (depth <= 2) return 14;
  if (depth === 3) return 26;
  return 36;
}

function getLineOffset(depth: number): number {
  return depth >= 3 ? 10 : 0;
}

function TOCThumb({
  containerRef,
  activeHeading,
  toc,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  activeHeading: string | null;
  toc: TOCItemType[];
}) {
  const [position, setPosition] = React.useState<{
    top: number;
    height: number;
    left: number;
  } | null>(null);

  React.useEffect(() => {
    if (!containerRef?.current || !activeHeading) {
      setPosition(null);
      return;
    }

    const updatePosition = () => {
      const element: HTMLElement | null | undefined =
        containerRef?.current?.querySelector(`a[href="#${activeHeading}"]`);

      if (element) {
        const styles = getComputedStyle(element);
        const top = element.offsetTop + parseFloat(styles.paddingTop);
        const height =
          element.clientHeight -
          parseFloat(styles.paddingTop) -
          parseFloat(styles.paddingBottom);

        // Find the depth of the active item
        const activeItem = toc.find((item) => item.url === `#${activeHeading}`);
        const left = activeItem ? getLineOffset(activeItem.depth) : 0;

        setPosition({ top, height, left });
      }
    };

    updatePosition();

    const resizeObserver = new ResizeObserver(updatePosition);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef, activeHeading, toc]);

  if (!position) return null;

  return (
    <div
      className="absolute w-0.5 bg-primary rounded-sm transition-all duration-200 ease-out"
      style={{
        top: `${position.top}px`,
        height: `${position.height}px`,
        left: `${position.left}px`,
      }}
    />
  );
}

export function DesktopToc({ toc, className }: DocsTableOfContentsProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const itemIds = React.useMemo(
    () => toc.map((item) => item.url.replace("#", "")),
    [toc],
  );
  const activeHeading = useTocActiveItem(itemIds);
  const [svg, setSvg] = React.useState<{
    path: string;
    width: number;
    height: number;
  }>();

  React.useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    function onResize(): void {
      if (container.clientHeight === 0) return;
      let w = 0,
        h = 0;
      const d: string[] = [];

      for (let i = 0; i < toc.length; i++) {
        const element: HTMLElement | null = container.querySelector(
          `a[href="#${toc[i].url.slice(1)}"]`,
        );
        if (!element) continue;

        const styles = getComputedStyle(element);
        const offset = getLineOffset(toc[i].depth) + 1;
        const top = element.offsetTop + parseFloat(styles.paddingTop);
        const bottom =
          element.offsetTop +
          element.clientHeight -
          parseFloat(styles.paddingBottom);

        w = Math.max(offset, w);
        h = Math.max(h, bottom);

        d.push(`${i === 0 ? "M" : "L"}${offset} ${top}`);
        d.push(`L${offset} ${bottom}`);
      }

      setSvg({
        path: d.join(" "),
        width: w + 1,
        height: h,
      });
    }

    const observer = new ResizeObserver(onResize);
    onResize();

    observer.observe(container);
    return () => {
      observer.disconnect();
    };
  }, [toc]);

  if (!toc?.length) {
    return null;
  }

  return (
    <div
      className={cn("relative flex flex-col gap-2 p-4 pt-0 text-sm", className)}
    >
      <p className="text-muted-foreground h-6 text-xs items-center flex gap-1.5">
        <span className="inline-block">
          <TextAlignStartIcon className="size-4 text-muted-foreground" />
        </span>
        On this page
      </p>
      <div className="relative">
        {svg && (
          <div
            className="absolute left-0 top-0"
            style={{
              width: svg.width,
              height: svg.height,
              maskImage: `url("data:image/svg+xml,${encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svg.width} ${svg.height}"><path d="${svg.path}" stroke="black" stroke-width="1" fill="current" /></svg>`,
              )}")`,
            }}
          >
            <TOCThumb
              containerRef={containerRef}
              activeHeading={activeHeading}
              toc={toc}
            />
          </div>
        )}
        <div ref={containerRef} className="flex flex-col">
          {toc.map((item, index) => {
            const isActive = item.url === `#${activeHeading}`;
            const upper = index > 0 ? toc[index - 1]?.depth : item.depth;
            const lower =
              index < toc.length - 1 ? toc[index + 1]?.depth : item.depth;

            const offset = getLineOffset(item.depth);
            const upperOffset = getLineOffset(upper);
            const lowerOffset = getLineOffset(lower);

            return (
              <a
                key={item.url}
                href={item.url}
                data-active={isActive}
                style={{
                  paddingLeft: `${getItemOffset(item.depth)}px`,
                }}
                className={cn(
                  "relative py-1.5 text-sm text-muted-foreground transition-colors [overflow-wrap:anywhere] first:pt-0 last:pb-0",
                  "hover:text-primary",
                  "data-[active=true]:text-primary",
                )}
              >
                {offset !== upperOffset && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    className="absolute -top-1.5 left-0 size-4"
                  >
                    <title>Active link</title>
                    <line
                      x1={upperOffset}
                      y1="0"
                      x2={offset}
                      y2="12"
                      className="stroke-foreground/10"
                      strokeWidth="1"
                    />
                  </svg>
                )}

                <div
                  className={cn(
                    "absolute inset-y-0 w-px bg-foreground/10",
                    offset !== upperOffset && "top-1.5",
                    offset !== lowerOffset && "bottom-1.5",
                  )}
                  style={{
                    left: `${offset}px`,
                  }}
                />

                {item.title}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
