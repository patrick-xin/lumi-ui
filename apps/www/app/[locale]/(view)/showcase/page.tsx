import { routing } from "@/lib/i18n/routing";
import { PlaygroundContent } from "../playground/playground-content";

export const dynamic = "force-static";
export const dynamicParams = false;
export const metadata = { robots: { index: false, follow: false } };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function ShowcasePage() {
  return <PlaygroundContent />;
}
