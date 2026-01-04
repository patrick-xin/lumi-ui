import { notFound } from "next/navigation";
import { getLLMText } from "@/lib/get-llm-text";
import { i18n } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/routing";
import { source } from "@/lib/source";

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<"/llms/[[...slug]]">,
) {
  const { slug } = await params;

  let locale = i18n.defaultLanguage;
  let slugWithoutLocale = slug;

  if (slug && slug.length > 0 && i18n.languages.includes(slug[0] as Locale)) {
    locale = slug[0] as Locale;
    slugWithoutLocale = slug.slice(1);
  }

  const page = source.getPage(slugWithoutLocale, locale);

  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}

export function generateStaticParams() {
  return source.generateParams();
}
