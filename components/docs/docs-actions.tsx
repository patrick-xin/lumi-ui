"use client";

import { ChevronDownIcon } from "lucide-react";
import { CopyPageButton } from "@/components/docs/copy-page-button";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/ui/button";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "@/registry/ui/menu";

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
      href={`${url}.mdx`}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full inline-flex items-center justify-start gap-4"
    >
      <Icons.markdown className="size-4" />
      <span>View as Markdown</span>
    </a>
  ),
  v0: (url: string) => (
    <a
      className="w-full inline-flex items-center justify-start gap-4"
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
      className="w-full inline-flex items-center justify-start gap-4"
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
      className="w-full inline-flex items-center justify-start gap-4"
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
      <Menu>
        <MenuTrigger
          render={(props) => (
            <button
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "h-8 rounded-l-none border-l data-[popup-open]:[&_svg]:rotate-180 max-md:[&_svg]:rotate-180 max-md:data-[popup-open]:[&_svg]:rotate-0",
              )}
              {...props}
            >
              <ChevronDownIcon className="size-3.5 transition-transform" />
            </button>
          )}
        />

        <MenuContent
          align="end"
          className="w-48 bg-background/80 backdrop-blur-md"
        >
          {Object.entries(menuItems).map(([key, value]) => (
            <MenuItem className="text-xs" key={key}>
              {value(url)}
            </MenuItem>
          ))}
        </MenuContent>
      </Menu>
    </div>
  );
}
