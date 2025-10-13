import Logo from "@/components/logo";
import { siteConfig } from "@/lib/config";

export default function Home() {
  return (
    <div className="relative max-w-6xl mx-auto mt-32 p-12 rounded-2xl backdrop-blur-xl">
      {/* Corner gradients - Top Left */}
      <div className="absolute top-0 left-0 w-24 h-px opacity-50">
        <div
          className="h-full w-full"
          style={{
            background: `linear-gradient(to right, var(--primary), transparent)`,
          }}
        />
      </div>
      <div className="absolute top-0 left-0 w-px h-24 opacity-50">
        <div
          className="h-full w-full"
          style={{
            background: `linear-gradient(to bottom, var(--primary), transparent)`,
          }}
        />
      </div>

      {/* Corner gradients - Top Right */}
      <div className="absolute top-0 right-0 w-24 h-px opacity-50">
        <div
          className="h-full w-full"
          style={{
            background: `linear-gradient(to left, var(--primary), transparent)`,
          }}
        />
      </div>
      <div className="absolute top-0 right-0 w-px h-24 opacity-50">
        <div
          className="h-full w-full"
          style={{
            background: `linear-gradient(to bottom, var(--primary), transparent)`,
          }}
        />
      </div>

      {/* Corner gradients - Bottom Left */}
      <div className="absolute bottom-0 left-0 w-24 h-px opacity-50">
        <div
          className="h-full w-full"
          style={{
            background: `linear-gradient(to right, var(--primary), transparent)`,
          }}
        />
      </div>
      <div className="absolute bottom-0 left-0 w-px h-24 opacity-50">
        <div
          className="h-full w-full"
          style={{
            background: `linear-gradient(to top, var(--primary), transparent)`,
          }}
        />
      </div>

      {/* Corner gradients - Bottom Right */}
      <div className="absolute bottom-0 right-0 w-24 h-px opacity-50">
        <div
          className="h-full w-full"
          style={{
            background: `linear-gradient(to left, var(--primary), transparent)`,
          }}
        />
      </div>
      <div className="absolute bottom-0 right-0 w-px h-24 opacity-50">
        <div
          className="h-full w-full"
          style={{
            background: `linear-gradient(to top, var(--primary), transparent)`,
          }}
        />
      </div>

      <div className="flex flex-col items-center justify-center">
        <Logo className="size-20" />
        <p className="text-muted-foreground mb-8">{siteConfig.description}</p>
      </div>
    </div>
  );
}
