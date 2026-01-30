import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/config";
import { fontVariables } from "@/lib/fonts";
import { routing } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";
import { Toaster } from "@/registry/ui/toast";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  alternates: {
    canonical: "./",
    languages: {
      "en-US": "/",
      "zh-CN": "/cn",
    },
  },
  authors: [
    {
      name: "lumi-ui",
      url: "https://www.lumiui.dev/",
    },
  ],
  creator: "lumi-ui",
  description: siteConfig.description,
  icons: {
    apple: "/apple-touch-icon.png",
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
  },
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Components",
    "Base UI",
    "lumi-ui",
    "AI",
    "Agent Experience",
    "Agentic Coding",
  ],
  manifest: `${siteConfig.url}/site.webmanifest`,
  metadataBase: new URL("https://www.lumiui.dev"),
  openGraph: {
    description: siteConfig.description,
    images: [
      {
        alt: siteConfig.name,
        height: 630,
        url: "/opengraph-image.jpg",
        width: 1200,
      },
    ],
    locale: "en_US",
    siteName: siteConfig.name,
    title: siteConfig.name,
    type: "website",
    url: "https://lumiui.dev",
  },
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@alpesdream",
    description: siteConfig.description,
    images: ["/twitter.jpg"],
    title: siteConfig.name,
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn("font-sans antialiased", fontVariables)}>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <div className="root">
              {children}
              <Toaster
                limit={4}
                position="bottom-right"
                swipeDirection={["right", "down"]}
              />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
