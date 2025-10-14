import Link from "next/link";
import { Logo } from "@/components/logo";
import { ModeSwitcher } from "@/components/mode-switcher";
import { MainNav } from "@/components/site/header/main-nav";
import { MobileNav } from "@/components/site/header/mobile-nav";
import { siteConfig } from "@/lib/config";
import { source } from "@/lib/source";

export function SiteHeader() {
  const pageTree = source.pageTree;
  return (
    <header className="sticky top-0 z-50 w-full h-[var(--header-height)] transition-colors duration-300 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[color-mix(in_oklab,var(--color-foreground)_7.5%,transparent)] via-50% to-transparent" />
      <div className="flex h-full items-center container justify-between mx-auto w-full">
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 flex-1 min-w-0">
          <Link href="/" className="inline-flex items-center flex-shrink-0">
            <Logo />
            <span className="sr-only">{siteConfig.name}</span>
          </Link>

          <div className="flex-1 min-w-0 relative h-10">
            <MainNav items={siteConfig.navItems} />
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <ModeSwitcher />
          </div>
        </div>
        {/* Mobile */}
        <div className="flex md:hidden items-center justify-between gap-3 w-full">
          <div className="flex items-center gap-4 min-w-0">
            <MobileNav tree={pageTree} />
          </div>
          <ModeSwitcher />
        </div>
      </div>
    </header>
  );
}
