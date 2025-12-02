"use client";

import { Check, Copy, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/ui/button";

interface CopyPageButtonProps {
  slug?: string[];
  className?: string;
}

const contentCache = new Map<string, string>();

export function CopyPageButton({ slug, className }: CopyPageButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    setIsLoading(true);

    const url = `/llms/${slug?.join("/")}`;

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

      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size={"sm"}
      variant={"outline"}
      onClick={handleCopy}
      className={className}
      disabled={isLoading}
      aria-label="Copy page content as MDX"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : copied ? (
        <Check className="h-4 w-4" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
      <span className="ml-2">Copy Page</span>
    </Button>
  );
}
