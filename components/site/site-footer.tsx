import Link from "next/link";
import Logo from "@/components/logo";
import { siteConfig } from "@/lib/config";

const links = [
  {
    title: "Github",
    href: `${siteConfig.links.github}`,
  },
];

export function SiteFooter() {
  return (
    <footer className="border-b pt-8 pb-18 sm:pb-0">
      <div className="mx-auto max-w-5xl p-6">
        <div className="flex flex-wrap justify-between gap-6">
          <span className="text-muted-foreground inline-flex items-center order-last gap-2 text-center text-xs md:order-first">
            <span className="inline-flex items-center gap-1">
              © <Logo className="size-10" />
            </span>
            {new Date().getFullYear()}
          </span>
          <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
            {links.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-muted-foreground hover:text-primary block duration-150"
              >
                <span>{link.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
