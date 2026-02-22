import Link from "next/link";
import { LanguageSelector } from "@/components/language-selector";
import { Logo } from "@/components/logo";
import { ModeSwitcher } from "@/components/mode-switcher";
import { MobileNav } from "@/components/site/header/mobile-nav";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { siteConfig } from "@/lib/config";
import {
  getTreeWithStatus,
  transformNavigation,
} from "@/lib/get-tree-with-status";
import { source } from "@/lib/source";
import { GitHubLink } from "./github-link";
import { MainNav } from "./main-nav";
import { SiteCommandMenu } from "./site-command-menu";

export function SiteHeader({ locale }: { locale: string }) {
  const navGroups = transformNavigation(locale);
  const tree = getTreeWithStatus(source.getPageTree(locale));
  return (
    <header className="sticky top-0 z-50 w-full h-[var(--header-height)] transition-colors duration-300 backdrop-blur-md bg-background/80">
      <div className="hidden md:block absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[color-mix(in_oklab,var(--color-foreground)_7.5%,transparent)] via-50% to-transparent" />
      <div className="flex h-full items-center container justify-between mx-auto w-full">
        <div className="flex items-center gap-6 flex-1 min-w-0">
          <div className="md:hidden">
            <MobileNav navGroups={navGroups} />
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link className="flex items-center focus-state" href="/">
              <Logo />
              <span className="sr-only">{siteConfig.name}</span>
            </Link>
            <MainNav
              items={[
                { href: "/docs/introduction", label: "Docs" },
                { href: "/widgets", label: "Component Lab" },
                { href: "/blocks", label: "Composition Library" },
              ]}
            />
          </div>
        </div>
        <div className="flex justify-center md:hidden">
          <Link className="flex items-center focus-state" href="/">
            <Logo />
          </Link>
        </div>
        <div className="flex items-center justify-end gap-2 md:gap-3 flex-1">
          <SiteCommandMenu tree={tree} />
          <LanguageSelector />
          <div className="hidden md:flex items-center gap-3">
            <ThemeSwitcher />
            <ModeSwitcher />
            <GitHubLink />
          </div>
        </div>
      </div>
    </header>
  );
}
