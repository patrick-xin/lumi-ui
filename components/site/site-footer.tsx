import Link from "next/link";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/config";
import { Separator } from "@/registry/ui/separator";

export function SiteFooter() {
  return (
    <footer className="">
      <div className="mx-auto max-w-5xl p-6">
        <div className="flex flex-wrap justify-center items-center gap-6">
          <span className="text-muted-foreground gap-2 flex items-center text-center text-xs">
            <span className="inline-flex items-center gap-2">
              <span>© {new Date().getFullYear()}</span>
              <Link href="/">
                <Logo className="size-10" />
              </Link>
            </span>
            <Separator orientation="vertical" className="h-3! mx-2" />
            <span>{siteConfig.slogan}</span>
            <Separator orientation="vertical" className="h-3! mx-2" />
            <span className="">
              Base UI version: <span>1.0.0-beta.7</span>
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
