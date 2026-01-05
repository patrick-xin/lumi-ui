import Link from "next/link";
import { LanguageSelector } from "@/components/language-selector";
import { Logo } from "@/components/logo";
import { ModeSwitcher } from "@/components/mode-switcher";
import { CommandMenu } from "@/components/site/header/command-menu";
import { MobileNav } from "@/components/site/header/mobile-nav";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { siteConfig } from "@/lib/config";
import {
  getTreeWithStatus,
  transformNavigation,
} from "@/lib/get-tree-with-status";
import { source } from "@/lib/source";
import { GitHubLink } from "./github-link";

export function SiteHeader({ locale }: { locale: string }) {
  const navGroups = transformNavigation(locale);
  const tree = getTreeWithStatus(source.getPageTree(locale));
  return (
    <header className="sticky top-0 z-50 w-full h-[var(--header-height)] transition-colors duration-300 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="hidden md:block absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[color-mix(in_oklab,var(--color-foreground)_7.5%,transparent)] via-50% to-transparent" />
      <div className="flex h-full items-center container justify-between mx-auto w-full">
        {/* Desktop */}
        <div className="hidden md:flex items-center justify-between gap-6 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Link className="flex items-center focus-state" href="/">
              <Logo />
              <span className="sr-only">{siteConfig.name}</span>
            </Link>
          </div>
          <div className="flex items-center justify-end gap-3">
            <CommandMenu tree={tree} />
            <LanguageSelector />
            <ThemeSwitcher />
            <ModeSwitcher />
            <GitHubLink />
          </div>
        </div>
        {/* Mobile */}
        <div className="grid grid-cols-3 md:hidden items-center gap-3 w-full">
          <MobileNav navGroups={navGroups} />

          <div className="flex justify-center">
            <Link className="flex items-center focus-state" href="/">
              <Logo />
              <span className="sr-only">{siteConfig.name}</span>
            </Link>
          </div>

          <div className="flex items-center justify-end gap-2">
            <CommandMenu tree={tree} />
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
}
