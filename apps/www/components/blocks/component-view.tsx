"use client";

import { useCopyToClipboard } from "@lumi-ui/ui/hooks/use-copy-to-clipboard";
import {
  Check,
  Fullscreen,
  Monitor,
  RotateCw,
  Smartphone,
  Tablet,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import type { PanelImperativeHandle } from "react-resizable-panels";
import { cn } from "@/lib/utils";
import type { ComponentName } from "@/registry/__registry";
import { Button } from "@/registry/ui/button";
import {
  ResizableGroup,
  ResizablePanel,
  ResizableSeparator,
} from "@/registry/ui/resizable";
import { Separator } from "@/registry/ui/separator";
import { Tabs, TabsListContent, TabsPanel, TabsTab } from "@/registry/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group";
import {
  createTooltipHandle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/ui/tooltip";

interface ComponentViewProps extends React.ComponentProps<"div"> {
  name: ComponentName;
  title?: string;
  description?: string;
  source: React.ReactNode;
  iframeHeight?: number | string;
}

export function ComponentView({
  name,
  title,
  description,
  className,
  source,
  iframeHeight,
  ...props
}: ComponentViewProps) {
  const tooltipHandle = React.useMemo(
    () => createTooltipHandle<{ title: string }>(),
    [],
  );
  const [iframeKey, setIframeKey] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const resizablePanelRef = React.useRef<PanelImperativeHandle>(null);
  const { copyToClipboard, isCopied } = useCopyToClipboard();
  const PANEL_ID = "preview-panel";
  const SPACER_ID = "spacer-panel";

  const height = iframeHeight
    ? typeof iframeHeight === "number"
      ? `${iframeHeight}px`
      : iframeHeight
    : "650px";

  return (
    <div
      className={cn(
        "group/block-view-wrapper flex flex-col gap-4 min-w-0",
        className,
      )}
      style={{ "--height": height } as React.CSSProperties}
      {...props}
    >
      <div className="flex flex-col gap-1.5">
        <h3 className="font-semibold text-lg tracking-tight text-foreground">
          {title || name}
        </h3>
        {description && (
          <p className="text-muted-foreground text-sm max-w-2xl text-pretty leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="w-full">
        <Tabs defaultValue="preview">
          <div className="flex items-center justify-between">
            <TabsListContent>
              <TabsTab value="preview">Preview</TabsTab>
              <TabsTab value="code">Code</TabsTab>
            </TabsListContent>
            <Separator
              className="h-4! mx-2 hidden md:block"
              orientation="vertical"
            />
            <div className="hidden items-center gap-1 rounded-md md:flex border-border/60">
              <TooltipProvider closeDelay={100}>
                <ToggleGroup
                  className="gap-1"
                  defaultValue={["100"]}
                  onValueChange={(value) => {
                    if (!value || value.length === 0) return;
                    const sizeValue = value[0];
                    if (resizablePanelRef?.current) {
                      resizablePanelRef.current.resize(sizeValue);
                    }
                  }}
                >
                  <TooltipTrigger
                    handle={tooltipHandle}
                    payload={{ title: "Desktop" }}
                    render={
                      <ToggleGroupItem size="xs" value="100">
                        <Monitor className="size-4" />
                      </ToggleGroupItem>
                    }
                  />
                  <TooltipTrigger
                    handle={tooltipHandle}
                    payload={{ title: "Tablet" }}
                    render={
                      <ToggleGroupItem size="xs" value="60">
                        <Tablet className="size-4" />
                      </ToggleGroupItem>
                    }
                  />
                  <TooltipTrigger
                    handle={tooltipHandle}
                    payload={{ title: "Smartphone" }}
                    render={
                      <ToggleGroupItem size="xs" value="30">
                        <Smartphone className="size-4" />
                      </ToggleGroupItem>
                    }
                  />
                </ToggleGroup>

                <TooltipTrigger
                  handle={tooltipHandle}
                  payload={{ title: "Open in New Tab" }}
                  render={
                    <Button
                      className="size-7 rounded-md p-0"
                      nativeButton={false}
                      render={
                        <Link href={`/view/${name}`} target="_blank">
                          <span className="sr-only">Open in New Tab</span>
                          <Fullscreen className="size-4" />
                        </Link>
                      }
                      size="icon"
                      variant="ghost"
                    />
                  }
                />

                <TooltipTrigger
                  handle={tooltipHandle}
                  payload={{ title: "Refresh Preview" }}
                  render={
                    <Button
                      className="size-7 rounded-md p-0"
                      onClick={() => {
                        setIframeKey((k) => k + 1);
                        setIsLoading(true);
                      }}
                      size="icon"
                      variant="ghost"
                    >
                      <RotateCw className="size-4" />
                      <span className="sr-only">Refresh Preview</span>
                    </Button>
                  }
                />

                <Tooltip handle={tooltipHandle}>
                  {({ payload }) => {
                    if (!payload) return null;
                    return <TooltipContent>{payload.title}</TooltipContent>;
                  }}
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center ml-auto">
              <Button
                className="w-fit gap-2 px-3 shadow-none font-mono text-xs"
                onClick={() => {
                  copyToClipboard(`npx shadcn@latest add @lumi-ui/${name}`);
                }}
                size="sm"
                variant="glow"
              >
                {isCopied ? (
                  <Check className="size-3.5" />
                ) : (
                  <Terminal className="size-3.5" />
                )}
                <span className="hidden sm:inline">
                  npx shadcn add @lumi-ui/{name}
                </span>
                <span className="sm:hidden">Install</span>
              </Button>
            </div>
          </div>

          <div className="relative rounded-md h-[var(--height)] overflow-hidden border">
            <TabsPanel keepMounted value="preview">
              <div className="relative grid w-full gap-4 h-[var(--height)]">
                <div className="absolute inset-0 bg-[radial-gradient(#d4d4d4_1px,transparent_1px)] bg-size-[20px_20px] dark:bg-[radial-gradient(#404040_1px,transparent_1px)]" />
                <ResizableGroup
                  className="rounded-md"
                  defaultLayout={{ [PANEL_ID]: 100, [SPACER_ID]: 0 }}
                  orientation="horizontal"
                >
                  <ResizablePanel
                    className="relative rounded-md bg-background shadow-sm overflow-hidden"
                    defaultSize={100}
                    id={PANEL_ID}
                    minSize={30}
                    panelRef={resizablePanelRef}
                  >
                    <iframe
                      className={cn(
                        "w-full h-full",
                        isLoading
                          ? "opacity-0"
                          : "opacity-100 transition-opacity duration-500",
                      )}
                      key={iframeKey}
                      onLoad={() => setIsLoading(false)}
                      src={`/view/${name}`}
                      title={title || name}
                    />
                  </ResizablePanel>
                  <ResizableSeparator withHandle />
                  <ResizablePanel defaultSize={0} id={SPACER_ID} minSize={0} />
                </ResizableGroup>
              </div>
            </TabsPanel>
            <TabsPanel keepMounted value="code">
              <div
                className="grid w-full overflow-scroll no-scrollbar overscroll-contain"
                style={{ height }}
              >
                {source}
              </div>
            </TabsPanel>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
