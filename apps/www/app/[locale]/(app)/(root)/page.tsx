import ComponentShowcase from "@/components/site/homepage/component-showcase";
import { HeroSection } from "@/components/site/homepage/hero";

export const dynamic = "force-static";

export default function Home() {
  return (
    <div className="flex flex-col overflow-y-hidden max-h-[calc(100dvh-10rem)] justify-center items-center gap-12">
      <HeroSection />
      <ComponentShowcase />
    </div>
  );
}
