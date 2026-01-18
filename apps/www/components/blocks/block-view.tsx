"use client";

import * as React from "react";
import type { PanelImperativeHandle } from "react-resizable-panels";
import type { Block, TreeNode } from "@/types";
import { BlockCodeView } from "./block-code-view";
import { BlockPreview } from "./block-preview";
import { BlockToolbar } from "./block-toolbar";

type BlockViewerContext = {
  item: Block;
  view: "code" | "preview";
  setView: (view: "code" | "preview") => void;
  activeFile: string | null;
  setActiveFile: (file: string) => void;
  tree: TreeNode[];
  iframeKey?: number;
  setIframeKey?: React.Dispatch<React.SetStateAction<number>>;
  highlightedFiles?: Record<string, React.ReactNode>;
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
>;

function BlockViewerToolbar() {
  const { setView, view, item, setIframeKey, resizablePanelRef } =
    useBlockViewer();

  return (
    <BlockToolbar
      item={item}
      resizablePanelRef={resizablePanelRef}
      setIframeKey={setIframeKey}
      setView={setView}
      view={view}
    />
  );
}

function BlockViewerView() {
  const { item, iframeKey, resizablePanelRef } = useBlockViewer();

  return (
    <BlockPreview
      iframeKey={iframeKey}
      item={item}
      resizablePanelRef={resizablePanelRef}
    />
  );
}

function BlockViewerMobile() {
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
        <div className="flex h-[300px] items-center justify-center rounded-xl border">
          <p className="text-center text-sm text-muted-foreground">
            Component preview
          </p>
        </div>
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

function BlockViewerCode() {
  const { item, tree, activeFile, setActiveFile, highlightedFiles } =
    useBlockViewer();

  return (
    <BlockCodeView
      activeFile={activeFile}
      highlightedFiles={highlightedFiles}
      item={item}
      onFileSelect={setActiveFile}
      tree={tree}
    />
  );
}

function BlockViewer({
  item,
  tree,
  highlightedFiles,
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
      <BlockViewerMobile />
    </BlockViewerProvider>
  );
}

export { BlockViewer };
