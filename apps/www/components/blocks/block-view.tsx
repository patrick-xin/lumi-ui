"use client";

import { Button } from "@lumi-ui/ui/button";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@lumi-ui/ui/collapsible";
import { useCopyToClipboard } from "@lumi-ui/ui/hooks/use-copy-to-clipboard";
import {
  ResizableGroup,
  ResizablePanel,
  ResizableSeparator,
} from "@lumi-ui/ui/resizable";
import { Separator } from "@lumi-ui/ui/separator";
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
} from "@lumi-ui/ui/sidebar";
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
  ChevronRight,
  Folder,
  FolderOpen,
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
import { CopyButton } from "@/components/docs/copy-button";
import { cn } from "@/lib/utils";
import type { Block, TreeNode } from "@/types";
import { FileIcon } from "./file-icons";

type BlockViewerContext = {
  item: Block;
  view: "code" | "preview";
  setView: (view: "code" | "preview") => void;
  activeFile: string | null;
  setActiveFile: (file: string) => void;
  tree: TreeNode[];
  iframeKey?: number;
  setIframeKey?: React.Dispatch<React.SetStateAction<number>>;
  highlightedFiles?: Promise<Record<string, React.ReactNode>>;
  resizablePanelRef: React.RefObject<PanelImperativeHandle | null> | null;
};

const BlockViewerContext = React.createContext<BlockViewerContext | null>(null);

function useBlockViewer() {
  const context = React.useContext(BlockViewerContext);
  if (!context) {
    throw new Error(
      "useBlockViewer must be used within a BlockViewerProvider.",
    );
  }
  return context;
}

function BlockViewerProvider({
  item,
  tree,
  highlightedFiles,
  children,
}: Pick<BlockViewerContext, "item" | "tree" | "highlightedFiles"> & {
  children: React.ReactNode;
}) {
  const [view, setView] = React.useState<BlockViewerContext["view"]>("preview");
  const [activeFile, setActiveFile] = React.useState<
    BlockViewerContext["activeFile"]
  >(item.files?.[0]?.target ?? null);
  const [iframeKey, setIframeKey] = React.useState(0);
  const resizablePanelRef = React.useRef<PanelImperativeHandle>(null);
  return (
    <BlockViewerContext.Provider
      value={{
        activeFile,
        highlightedFiles,
        iframeKey,
        item,
        resizablePanelRef,
        setActiveFile,
        setIframeKey,
        setView,
        tree,
        view,
      }}
    >
      <div
        className="group/block-view-wrapper flex min-w-0 scroll-mt-24 flex-col-reverse items-stretch gap-4 overflow-hidden md:flex-col"
        data-view={view}
        id={item.name}
        style={
          {
            "--height": item.meta?.iframeHeight ?? "900px",
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </BlockViewerContext.Provider>
  );
}

type BlockViewerProps = Pick<
  BlockViewerContext,
  "item" | "tree" | "highlightedFiles"
> & {
  children: React.ReactNode;
};

function BlockViewerToolbar() {
  const { setView, view, item, setIframeKey, resizablePanelRef } =
    useBlockViewer();
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

function BlockViewerIframe({ className }: { className?: string }) {
  const { item, iframeKey } = useBlockViewer();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <iframe
      className={cn(
        "bg-background no-scrollbar relative w-full rounded-md",
        isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-500",
        className,
      )}
      height={(item.meta?.iframeHeight as number) ?? 930}
      key={iframeKey}
      loading="lazy"
      onLoad={() => setIsLoading(false)}
      src={`/view/${item.name}`}
      title="blocks"
    />
  );
}

function BlockViewerView() {
  const { resizablePanelRef } = useBlockViewer();

  const PANEL_ID = "preview-panel";
  const SPACER_ID = "spacer-panel";

  return (
    <div className="hidden group-data-[view=code]/block-view-wrapper:hidden md:h-(--height) lg:flex rounded-md">
      <div className="relative grid w-full gap-4">
        <div className="absolute inset-0 right-4 [background-image:radial-gradient(#d4d4d4_1px,transparent_1px)] [background-size:20px_20px] dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]" />

        <ResizableGroup
          className="rounded-md border"
          defaultLayout={{ [PANEL_ID]: 100, [SPACER_ID]: 0 }}
          orientation="horizontal"
        >
          <ResizablePanel
            className="aspect-[4/2.5] overflow-hidden md:aspect-auto"
            defaultSize={100}
            id={PANEL_ID}
            minSize={30}
            panelRef={resizablePanelRef}
          >
            <BlockViewerIframe />
          </ResizablePanel>
          <ResizableSeparator withHandle />
          <ResizablePanel defaultSize={0} id={SPACER_ID} minSize={0} />
        </ResizableGroup>
      </div>
    </div>
  );
}

function BlockViewerMobile({ children }: { children: React.ReactNode }) {
  const { item } = useBlockViewer();

  return (
    <div className="flex flex-col gap-2 lg:hidden">
      <div className="flex items-center gap-2 px-2">
        <div className="line-clamp-1 text-sm font-medium">
          {item.description}
        </div>
        <div className="text-muted-foreground ml-auto shrink-0 font-mono text-xs">
          {item.name}
        </div>
      </div>
      {item.meta?.mobile === "component" ? (
        children
      ) : (
        <div className="flex h-[300px] items-center justify-center rounded-xl border">
          <p className="text-center text-sm text-muted-foreground">
            Mobile preview not available
          </p>
        </div>
      )}
    </div>
  );
}

function BlockCodeContent() {
  const { activeFile, highlightedFiles } = useBlockViewer();
  if (!highlightedFiles) return null;
  const files = React.use(highlightedFiles);

  const highlighted = activeFile ? files[activeFile] : null;

  return <div className="no-scrollbar overflow-y-auto">{highlighted}</div>;
}

function BlockViewerCode() {
  const { activeFile, item } = useBlockViewer();

  const file = React.useMemo(() => {
    return item.files?.find(
      (f: { target: string; content: string }) => f.target === activeFile,
    );
  }, [item.files, activeFile]);

  if (!file) {
    return null;
  }

  const language = file.target?.split(".").pop() ?? "tsx";
  const content = file.content ?? "";

  return (
    <div className="bg-code text-code-foreground mr-[14px] flex overflow-hidden rounded-xl border group-data-[view=preview]/block-view-wrapper:hidden md:h-(--height)">
      <div className="w-72">
        <BlockViewerFileTree />
      </div>
      <figure
        className="relative mx-0 mt-0 flex min-w-0 flex-1 flex-col rounded-md border-none"
        data-rehype-pretty-code-figure=""
      >
        <figcaption
          className="text-code-foreground [&_svg]:text-code-foreground flex h-12 shrink-0 items-center gap-2 border-b px-4 py-2 [&_svg]:size-4 [&_svg]:opacity-70"
          data-language={language}
        >
          <FileIcon filename={file.target} />
          <span className="truncate">{file.target}</span>
        </figcaption>
        <CopyButton className="top-1.5 right-2" code={content} variant="glow" />

        <BlockCodeContent />
      </figure>
    </div>
  );
}

function BlockViewerFileTree() {
  const { tree } = useBlockViewer();

  if (!tree) {
    return null;
  }

  return (
    <SidebarProvider className="flex min-h-full flex-col border-r">
      <Sidebar className="w-full flex-1" collapsible="none">
        <SidebarGroupLabel className="h-12 rounded-none border-b px-4 text-sm">
          Files
        </SidebarGroupLabel>
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="translate-x-0 gap-1.5">
              {tree.map((file, index) => (
                <Tree index={1} item={file} key={index} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </Sidebar>
    </SidebarProvider>
  );
}

function Tree({ item, index }: { item: TreeNode; index: number }) {
  const { activeFile, setActiveFile } = useBlockViewer();

  if (!item.children) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          className="rounded-none pl-(--index) whitespace-nowrap"
          data-index={index}
          isActive={item.path === activeFile}
          onClick={() => item.path && setActiveFile(item.path)}
          style={
            {
              "--index": `${index * (index === 2 ? 1.2 : 1.3)}rem`,
            } as React.CSSProperties
          }
        >
          <ChevronRight className="invisible" />
          <FileIcon filename={item.name} />
          {item.name}
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <Collapsible defaultOpen>
        <CollapsibleTrigger
          render={
            <SidebarMenuButton
              className="group rounded-none pl-(--index) whitespace-nowrap"
              style={
                {
                  "--index": `${index * (index === 1 ? 1 : 1.2)}rem`,
                } as React.CSSProperties
              }
            >
              <ChevronRight className="transition-transform group-data-[panel-open]:rotate-90" />
              <Folder className="folder-closed size-4 text-blue-500 fill-blue-500/20" />
              <FolderOpen className="folder-open hidden size-4 text-blue-500 fill-blue-500/20" />
              {item.name}
            </SidebarMenuButton>
          }
        />
        <CollapsiblePanel>
          <SidebarMenuSub className="m-0 w-full translate-x-0 border-none p-0">
            {item.children.map((subItem, key) => (
              <Tree index={index + 1} item={subItem} key={key} />
            ))}
          </SidebarMenuSub>
        </CollapsiblePanel>
      </Collapsible>
    </SidebarMenuItem>
  );
}

function BlockViewer({
  item,
  tree,
  highlightedFiles,
  children,
  ...props
}: BlockViewerProps) {
  return (
    <BlockViewerProvider
      highlightedFiles={highlightedFiles}
      item={item}
      tree={tree}
      {...props}
    >
      <BlockViewerToolbar />
      <BlockViewerView />
      <BlockViewerCode />
      <BlockViewerMobile>{children}</BlockViewerMobile>
    </BlockViewerProvider>
  );
}

export { BlockViewer };
