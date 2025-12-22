import Link from "next/link";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/config";
import { Separator } from "@/registry/ui/separator";

export function SiteFooter() {
  return (
    <footer className="pb-10 lg:pb-0">
      <div className="mx-auto max-w-5xl p-6">
        <div className="flex flex-wrap justify-center items-center gap-6 text-muted-foreground">
          <span className="gap-2 flex items-center text-center text-xs">
            <span className="inline-flex items-center gap-2">
              <Link href="/">
                <Logo className="size-10" />
              </Link>
              <span>© {new Date().getFullYear()}</span>
            </span>
            <Separator orientation="vertical" className="h-4!" />
            <span>{siteConfig.slogan}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
