"use client";

import { cn } from "@/lib/utils";
import { Button } from "@lumi-ui/ui/button";
import { useCopyToClipboard } from "@lumi-ui/ui/hooks/use-copy-to-clipboard";
import { Separator } from "@lumi-ui/ui/separator";
import { Tabs, TabsListContent, TabsTab } from "@lumi-ui/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@lumi-ui/ui/toggle-group";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@lumi-ui/ui/tooltip";
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

interface ComponentToolbarProps extends React.ComponentProps<"div"> {
  view: "preview" | "code";
  setView: (view: "preview" | "code") => void;
  onRefresh?: () => void;
  resizablePanelRef?: React.RefObject<PanelImperativeHandle | null> | null;
  name: string;
}

export function ComponentToolbar({
  view,
  setView,
  onRefresh,
  resizablePanelRef,
  name,
  className,
  children,
  ...props
}: ComponentToolbarProps) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  return (
    <div
      className={cn(
        "flex w-full items-center justify-between gap-2 border-b border-border/40 pb-4",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <Tabs
          onValueChange={(value) => setView(value as "preview" | "code")}
          value={view}
        >
          <TabsListContent>
            <TabsTab value="preview">Preview</TabsTab>
            <TabsTab value="code">Code</TabsTab>
          </TabsListContent>
        </Tabs>

        {children}

        <Separator className="mx-2 h-4! hidden lg:block" orientation="vertical" />
        <div className="hidden items-center gap-1 rounded-md lg:flex border-border/60">
          <TooltipProvider closeDelay={100}>
            <ToggleGroup
              className="gap-1"
              defaultValue={[100]}
              onValueChange={(value) => {
                if (!value || value.length === 0) return;
                const sizeValue = value[0];
                setView("preview");
                if (resizablePanelRef?.current) {
                  resizablePanelRef.current.resize(sizeValue);
                }
              }}
            >
              <Tooltip>
                <TooltipTrigger
                  render={
                    <ToggleGroupItem size="xs" value="100">
                      <Monitor className="size-4" />
                    </ToggleGroupItem>
                  }
                />
                <TooltipContent>Desktop</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  render={
                    <ToggleGroupItem size="xs" value="60">
                      <Tablet className="size-4" />
                    </ToggleGroupItem>
                  }
                />
                <TooltipContent>Tablet</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  render={
                    <ToggleGroupItem size="xs" value="30">
                      <Smartphone className="size-4" />
                    </ToggleGroupItem>
                  }
                />
                <TooltipContent>Mobile</TooltipContent>
              </Tooltip>
            </ToggleGroup>

            <div className="flex items-center gap-0.5 ml-1">
              <Tooltip>
                <TooltipTrigger
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
                <TooltipContent>Open in New Tab</TooltipContent>
              </Tooltip>

              {onRefresh && (
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        className="size-7 rounded-md p-0"
                        onClick={onRefresh}
                        size="icon"
                        variant="ghost"
                      >
                        <RotateCw className="size-4" />
                        <span className="sr-only">Refresh Preview</span>
                      </Button>
                    }
                  />
                  <TooltipContent>Refresh Preview</TooltipContent>
                </Tooltip>
              )}
            </div>
          </TooltipProvider>
        </div>
      </div>

      <div className="flex items-center">
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
          <span className="hidden sm:inline">npx shadcn add @lumi-ui/{name}</span>
          <span className="sm:hidden">Install</span>
        </Button>
      </div>
    </div>
  );
}
