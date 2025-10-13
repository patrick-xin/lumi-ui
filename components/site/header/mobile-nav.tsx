"use client";

import type { Root } from "fumadocs-core/page-tree";
import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";
import { Dialog, DialogPopup, DialogTrigger } from "@/registry/ui/dialog";

const TOP_LEVEL_SECTIONS = [
  { name: "Get Started", title: "", href: "/installation" },
  { name: "Components", title: "Components", href: "/docs/components" },
];

export function MobileNav({
  tree,
  className,
}: {
  tree: Root;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            className={cn(
              "extend-touch-target h-8 touch-manipulation items-center justify-start gap-2.5 !p-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent",
              className,
            )}
          >
            <MenuIcon open={open} />
          </Button>
        }
      />

      <DialogPopup
        showCloseButton={false}
        classNames={{
          popup: cn(
            "mx-0 h-[calc(100dvh-4rem)] w-screen max-w-none rounded-none border-0 p-0 top-16 translate-y-0", // Removed overflow-auto
            "data-[starting-style]:!scale-100 data-[ending-style]:!scale-100",
            "bg-background/70 backdrop-blur",
          ),
          backdrop: "hidden",
        }}
      >
        <nav className="flex h-full flex-col gap-12 overflow-y-auto p-6 no-scrollbar">
          <TopLevelNavigation onNavigate={() => setOpen(false)} />
          <TreeNavigation tree={tree} onNavigate={() => setOpen(false)} />
        </nav>
      </DialogPopup>
    </Dialog>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <div className="relative flex h-8 w-4 items-center justify-center">
      <div className="relative size-4">
        <span
          className={cn(
            "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
            open ? "top-[0.4rem] -rotate-45" : "top-1",
          )}
        />
        <span
          className={cn(
            "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
            open ? "top-[0.4rem] rotate-45" : "top-2.5",
          )}
        />
      </div>
      <span className="sr-only">Toggle Menu</span>
    </div>
  );
}

function TopLevelNavigation({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="flex flex-col gap-3">
      {TOP_LEVEL_SECTIONS.map((item) => (
        <MobileLink key={item.name} href={item.href} onOpenChange={onNavigate}>
          {item.name}
        </MobileLink>
      ))}
    </div>
  );
}

function TreeNavigation({
  tree,
  onNavigate,
}: {
  tree: Root;
  onNavigate: () => void;
}) {
  return (
    <div className="flex flex-col gap-8">
      {tree?.children?.map((group) => {
        if (group.type !== "folder") return null;

        return (
          <div key={group.$id} className="flex flex-col gap-4">
            <div className="text-muted-foreground text-sm font-medium">
              {group.name}
            </div>
            <div className="flex flex-col gap-3">
              {group.children.map((item) => {
                if (item.type !== "page") return null;

                return (
                  <MobileLink
                    key={item.url}
                    href={item.url}
                    onOpenChange={onNavigate}
                  >
                    {item.name}
                  </MobileLink>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: LinkProps & {
  onOpenChange?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();

  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.();
      }}
      className={cn("text-xl font-medium", className)}
      {...props}
    >
      {children}
    </Link>
  );
}
