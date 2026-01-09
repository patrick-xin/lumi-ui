"use client";

import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Logo } from "@/components/logo";
import { ModeSwitcher } from "@/components/mode-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";
import {
  Dialog,
  DialogPopup,
  DialogPortal,
  DialogTrigger,
} from "@/registry/ui/dialog";
import { ScrollArea } from "@/registry/ui/scroll-area";
import type { NavGroup } from "@/types";
import { GitHubLink } from "./github-link";

export function MobileNav({
  navGroups,
  className,
}: {
  navGroups: NavGroup[];
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger
        render={
          <Button
            className={cn(
              "extend-touch-target h-8 touch-manipulation items-center justify-start gap-2.5 p-0! hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent",
              className,
            )}
            variant="ghost"
          >
            <MenuIcon open={open} />
          </Button>
        }
      />
      <DialogPortal>
        <DialogPopup className="top-16 bg-background/80 backdrop-blur-md h-[calc(100dvh-4rem)] fixed w-screen py-0 px-4">
          <div className="flex h-full flex-col gap-4">
            <ScrollArea gradientScrollFade noScrollBar>
              <nav>
                <TreeNavigation
                  navGroups={navGroups}
                  onNavigate={() => setOpen(false)}
                />
              </nav>
            </ScrollArea>

            <div className="flex items-center justify-between pb-4">
              <Logo />
              <div className="flex items-center gap-2">
                <ThemeSwitcher />
                <ModeSwitcher />
                <GitHubLink />
              </div>
            </div>
          </div>
        </DialogPopup>
      </DialogPortal>
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

function TreeNavigation({
  navGroups,
  onNavigate,
}: {
  navGroups: NavGroup[];
  onNavigate: () => void;
}) {
  return (
    <div className="flex flex-col gap-8 my-6">
      {navGroups?.map((group) => {
        return (
          <div className="flex flex-col gap-4" key={group.value}>
            <div className="text-muted-foreground text-sm font-medium">
              {group.value}
            </div>
            <div className="flex flex-col gap-3">
              {group.items.map((item) => {
                return (
                  <MobileLink
                    href={item.url}
                    key={item.url}
                    onOpenChange={onNavigate}
                  >
                    {item.label}
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
      className={cn("text-xl font-medium", className)}
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.();
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
