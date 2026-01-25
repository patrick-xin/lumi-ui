"use client";
import { Button } from "@lumi-ui/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const t = useTranslations("HomePage");
  return (
    <div className="overflow-hidden">
      <section>
        <div className="relative pt-24">
          <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]" />
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex flex-col justify-center">
              <div className="relative mx-auto">
                {/* Corner gradients - Top Left */}
                <CornerGradients />
                <h1
                  className={cn(
                    "text-center text-5xl font-bold tracking-tight md:text-7xl",
                  )}
                >
                  <span className="relative inline-block overflow-hidden text-transparent bg-clip-text bg-gradient-to-b from-zinc-200 to-zinc-500">
                    {t("title")}
                  </span>
                </h1>
              </div>
              <p className="mt-8  text-pretty text-lg text-muted-foreground mx-auto xl:mt-12">
                {t("description")}
              </p>
              <div className="mt-12 flex justify-center items-center flex-wrap gap-4 mx-auto xl:mt-16">
                <Button
                  className="w-50"
                  nativeButton={false}
                  render={
                    <Link href="/docs/introduction">
                      <span className="text-nowrap">{t("viewDocs")}</span>
                    </Link>
                  }
                  size="lg"
                />
                <Button
                  className="w-50"
                  nativeButton={false}
                  render={
                    <Link href="/docs/components">
                      <span className="text-nowrap">
                        {t("browseComponents")}
                      </span>
                    </Link>
                  }
                  size="lg"
                  variant="glow"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const CornerGradients = () => {
  return (
    <>
      <div aria-hidden className="absolute -top-4 -left-4 w-16 h-px opacity-50">
        <div
          className="h-full w-full"
          style={{
            background: `linear-gradient(to right, var(--primary), transparent)`,
          }}
        />
      </div>
      <div aria-hidden className="absolute -top-4 -left-4 w-px h-16 opacity-50">
        <div
          className="h-full w-full"
          style={{
            background: `linear-gradient(to bottom, var(--primary), transparent)`,
          }}
        />
      </div>
      <div
        aria-hidden
        className="absolute -bottom-4 -right-4 w-16 h-px opacity-50"
      >
        <div
          className="h-full w-full"
          style={{
            background: `linear-gradient(to left, var(--primary), transparent)`,
          }}
        />
      </div>
      <div
        aria-hidden
        className="absolute -bottom-4 -right-4 w-px h-16 opacity-50"
      >
        <div
          className="h-full w-full"
          style={{
            background: `linear-gradient(to top, var(--primary), transparent)`,
          }}
        />
      </div>
    </>
  );
};
