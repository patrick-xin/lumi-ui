import Link from "next/link";
import { CommandMenu } from "@/components/command-menu";
import { Logo } from "@/components/logo";
import { ModeSwitcher } from "@/components/mode-switcher";
import { MobileNav } from "@/components/site/header/mobile-nav";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { siteConfig } from "@/lib/config";
import { transformNavigation } from "@/lib/get-tree-with-status";
import { GitHubLink } from "./github-link";

export function SiteHeader() {
  const navGroups = transformNavigation();
  return (
    <header className="sticky top-0 z-50 w-full h-[var(--header-height)] transition-colors duration-300 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[color-mix(in_oklab,var(--color-foreground)_7.5%,transparent)] via-50% to-transparent" />
      <div className="flex h-full items-center container justify-between mx-auto w-full">
        {/* Desktop */}
        <div className="hidden md:flex items-center justify-between gap-6 flex-1 min-w-0">
          <Link href="/" className="flex items-center">
            <Logo />
            <span className="sr-only">{siteConfig.name}</span>
          </Link>
          <div className="flex items-center justify-end gap-3">
            <CommandMenu navGroups={navGroups} />
            <ThemeSwitcher />
            <ModeSwitcher />
            <GitHubLink />
          </div>
        </div>
        {/* Mobile */}
        <div className="flex md:hidden items-center justify-between gap-3 w-full">
          <div className="flex items-center gap-4 min-w-0">
            <MobileNav navGroups={navGroups} />
          </div>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <ModeSwitcher />
            <GitHubLink />
          </div>
        </div>
      </div>
    </header>
  );
}
