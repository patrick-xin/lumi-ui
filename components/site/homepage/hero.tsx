import Link from "next/link";
import { Button } from "@/registry/ui/button";
import { Banner } from "../../banner";

export function HeroSection() {
  return (
    <div className="overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 isolate hidden contain-strict lg:block"
      >
        <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
        <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
        <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
      </div>
      <section>
        <div className="relative pt-24">
          <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]" />
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex flex-col justify-center">
              <div className="relative mx-auto">
                {/* Corner gradients - Top Left */}
                <div
                  aria-hidden
                  className="absolute -top-4 -left-4 w-16 h-px opacity-50"
                >
                  <div
                    className="h-full w-full"
                    style={{
                      background: `linear-gradient(to right, var(--primary), transparent)`,
                    }}
                  />
                </div>
                <div
                  aria-hidden
                  className="absolute -top-4 -left-4 w-px h-16 opacity-50"
                >
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
                <Banner />
                <h1 className="text-balance tracking-tight text-5xl font-bold md:text-6xl relative">
                  Illuminate your interface
                </h1>
              </div>
              <p className="mt-8 max-w-2xl text-pretty text-lg text-muted-foreground mx-auto xl:mt-12">
                Composable React components powered by{" "}
                <span>
                  <a
                    href="https://base-ui.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline"
                  >
                    Base UI
                  </a>
                </span>{" "}
                and{" "}
                <span>
                  <a
                    href="https://tailwindcss.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline"
                  >
                    Tailwind CSS
                  </a>
                </span>{" "}
                — built for clarity, speed, and total code ownership.
              </p>
              <div className="mt-12 flex items-center gap-4 mx-auto xl:mt-16">
                <Button
                  size="lg"
                  nativeButton={false}
                  render={
                    <Link href="/docs/introduction">
                      <span className="text-nowrap">View docs</span>
                    </Link>
                  }
                />
                <Button
                  size="lg"
                  nativeButton={false}
                  variant="ghost"
                  render={
                    <Link href="/docs/components">
                      <span className="text-nowrap">Browser components</span>
                    </Link>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
