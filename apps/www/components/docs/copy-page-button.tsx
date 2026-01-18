"use client";

import { Button } from "@lumi-ui/ui/button";
import { Check, Copy, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface CopyPageButtonProps {
  slug?: string[];
  className?: string;
  locale?: string;
}

const contentCache = new Map<string, string>();

export function CopyPageButton({
  slug,
  className,
  locale,
}: CopyPageButtonProps) {
  const t = useTranslations("DocPage");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    setIsLoading(true);

    const url = `/llms/${locale && locale !== "en" ? `${locale}/` : ""}${slug?.join("/")}`;

    try {
      const cached = contentCache.get(url);

      if (cached) {
        // Use cached content immediately
        await navigator.clipboard.writeText(cached);
        setCopied(true);
      } else {
        // Use ClipboardItem for efficient async copying
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/plain": fetch(url).then(async (res) => {
              if (!res.ok) {
                throw new Error(`Failed to fetch: ${res.status}`);
              }

              const content = await res.text();
              contentCache.set(url, content);

              return new Blob([content], { type: "text/plain" });
            }),
          }),
        ]);
        setCopied(true);
      }
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      aria-label="Copy page content as MDX"
      className={className}
      disabled={isLoading}
      onClick={handleCopy}
      size="sm"
      variant="glow"
    >
      {isLoading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : copied ? (
        <Check className="size-4" />
      ) : (
        <Copy className="size-4" />
      )}
      <span className="ml-2">{t("docActions.copyPage")}</span>
    </Button>
  );
}
