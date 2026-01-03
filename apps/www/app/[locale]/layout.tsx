import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import "@/styles/globals.css";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/config";
import { fontVariables } from "@/lib/fonts";
import { routing } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";
import { Toaster } from "@/registry/ui/toast";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://www.lumiui.dev",
  ),
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Components",
    "Base UI",
    "lumi-ui",
  ],
  authors: [
    {
      name: "lumi-ui",
      url: "https://www.lumiui.dev/",
    },
  ],
  creator: "lumi-ui",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://lumiui.dev",
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL || "https://lumiui.dev"}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      `${process.env.NEXT_PUBLIC_APP_URL || "https://lumiui.dev"}/opengraph-image.png`,
    ],
    creator: "@alpesdream",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  alternates: {
    canonical: "./",
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
                position="bottom-right"
                swipeDirection={["right", "down"]}
                limit={3}
              />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
