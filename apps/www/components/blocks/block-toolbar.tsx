"use client";

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
import type { PanelImperativeHandle } from "react-resizable-panels";
import type { Block } from "@/types";

interface BlockToolbarProps {
  item: Block;
  view: "code" | "preview";
  setView: (view: "code" | "preview") => void;
  setIframeKey?: React.Dispatch<React.SetStateAction<number>>;
  resizablePanelRef: React.RefObject<PanelImperativeHandle | null> | null;
}

export function BlockToolbar({
  item,
  view,
  setView,
  setIframeKey,
  resizablePanelRef,
}: BlockToolbarProps) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  return (
    <div className="hidden w-full items-center gap-2 lg:flex">
      <Tabs
        onValueChange={(value) => setView(value as "preview" | "code")}
        value={view}
      >
        <TabsListContent>
          <TabsTab value="preview">Preview</TabsTab>
          <TabsTab value="code">Code</TabsTab>
        </TabsListContent>
      </Tabs>
      <Separator className="mx-2 h-4!" orientation="vertical" />
      <Button
        className="px-0"
        nativeButton={false}
        render={
          <a href={`#${item.name}`}>{item.description?.replace(/\.$/, "")}</a>
        }
        variant="link"
      />

      <div className="ml-auto flex items-center gap-1">
        <div className="flex items-center gap-1 rounded-md">
          <TooltipProvider closeDelay={100}>
            <ToggleGroup
              className="gap-1"
              defaultValue={[100]}
              onValueChange={(value) => {
                if (!value || value.length === 0) {
                  return;
                }
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
                      <Monitor />
                    </ToggleGroupItem>
                  }
                />
                <TooltipContent>Desktop</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  render={
                    <ToggleGroupItem size="xs" value="60">
                      <Tablet />
                    </ToggleGroupItem>
                  }
                />
                <TooltipContent>Tablet</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <ToggleGroupItem size="xs" value="30">
                      <Smartphone />
                    </ToggleGroupItem>
                  }
                />
                <TooltipContent>Mobile</TooltipContent>
              </Tooltip>
            </ToggleGroup>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    className="size-7 rounded-md p-0"
                    nativeButton={false}
                    render={
                      <Link href={`/view/${item.name}`} target="_blank">
                        <span className="sr-only">Open in New Tab</span>
                        <Fullscreen />
                      </Link>
                    }
                    size="icon"
                    variant="ghost"
                  />
                }
              />
              <TooltipContent>Open in New Tab</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    className="size-7 rounded-md p-0"
                    onClick={() => {
                      if (setIframeKey) {
                        setIframeKey((k) => k + 1);
                      }
                    }}
                    size="icon"
                    variant="ghost"
                  >
                    <RotateCw />
                    <span className="sr-only">Refresh Preview</span>
                  </Button>
                }
              />
              <TooltipContent>Refresh Preview</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Separator className="mx-1 h-4!" orientation="vertical" />
        <Button
          className="w-fit gap-1 px-2 shadow-none"
          onClick={() => {
            copyToClipboard(`npx shadcn@latest add @lumi-ui/${item.name}`);
          }}
          size="sm"
          variant="glow"
        >
          {isCopied ? <Check /> : <Terminal />}
          <span>npx shadcn add @lumi-ui/{item.name}</span>
        </Button>
      </div>
    </div>
  );
}
