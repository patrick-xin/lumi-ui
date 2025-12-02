"use client";

import { ChevronDownIcon } from "lucide-react";
import { CopyPageButton } from "@/components/docs/copy-page-button";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";

function getPromptUrl(baseURL: string, url: string) {
  return `${baseURL}?q=${encodeURIComponent(
    `I’m looking at this lumi-ui documentation: ${url}.
Help me understand how to use it. Be ready to explain concepts, give examples, or help debug based on it.
  `,
  )}`;
}

const menuItems = {
  markdown: (url: string) => (
    <a
      href={`${url}.md`}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full inline-flex items-center justify-start gap-3"
    >
      <Icons.markdown className="size-4" />
      <span>View as Markdown</span>
    </a>
  ),
  v0: (url: string) => (
    <a
      className="w-full inline-flex items-center justify-start gap-3"
      href={getPromptUrl("https://v0.dev", url)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icons.v0 className="size-4" />
      <span>Open in v0</span>
    </a>
  ),
  chatgpt: (url: string) => (
    <a
      className="w-full inline-flex items-center justify-start gap-3"
      href={getPromptUrl("https://chatgpt.com", url)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icons.openai className="size-4" />
      <span>Open in ChatGPT</span>
    </a>
  ),
  claude: (url: string) => (
    <a
      className="w-full inline-flex items-center justify-start gap-3"
      href={getPromptUrl("https://claude.ai/new", url)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icons.claude className="size-4" />
      <span>Open in Claude</span>
    </a>
  ),
};

export function DocsActions({ slug, url }: { url: string; slug?: string[] }) {
  return (
    <div className="flex items-center">
      <CopyPageButton
        slug={slug}
        className="rounded-r-none border-r-0 text-xs"
      />
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-8 rounded-l-none border-l data-[popup-open]:[&_svg]:rotate-180 max-md:[&_svg]:rotate-180 max-md:data-[popup-open]:[&_svg]:rotate-0",
              )}
            >
              <ChevronDownIcon className="size-3.5 transition-transform" />
            </Button>
          }
        />

        <DropdownMenuContent
          className="w-44 bg-background/40 backdrop-blur-md"
          alignOffset={-40}
        >
          {Object.entries(menuItems).map(([key, value]) => (
            <DropdownMenuItem
              className="text-xs"
              render={value(url)}
              key={key}
            />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
