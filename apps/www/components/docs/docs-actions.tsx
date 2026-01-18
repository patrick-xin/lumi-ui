import { Button } from "@lumi-ui/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@lumi-ui/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { CopyPageButton } from "@/components/docs/copy-page-button";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

function getPromptUrl(baseURL: string, url: string) {
  return `${baseURL}?q=${encodeURIComponent(
    `I’m looking at this lumi-ui documentation: ${url}.
Help me understand how to use it. Be ready to explain concepts, give examples, or help debug based on it.
  `,
  )}`;
}

const menuItems = {
  markdown: (url: string, content: string) => (
    <a
      className="w-full inline-flex items-center justify-start gap-3"
      href={`${url}.md`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Icons.markdown className="size-4" />
      <span>{content}</span>
    </a>
  ),
  chatgpt: (url: string, content: string) => (
    <a
      className="w-full inline-flex items-center justify-start gap-3"
      href={getPromptUrl("https://chatgpt.com", url)}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Icons.openai className="size-4" />
      <span>{content}</span>
    </a>
  ),
  claude: (url: string, content: string) => (
    <a
      className="w-full inline-flex items-center justify-start gap-3"
      href={getPromptUrl("https://claude.ai/new", url)}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Icons.claude className="size-4" />
      <span>{content}</span>
    </a>
  ),
  v0: (url: string, content: string) => (
    <a
      className="w-full inline-flex items-center justify-start gap-3"
      href={getPromptUrl("https://v0.dev", url)}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Icons.v0 className="size-4" />
      <span>{content}</span>
    </a>
  ),
};

export function DocsActions({
  locale,
  slug,
  url,
}: {
  locale: string;
  slug?: string[];
  url: string;
}) {
  const t = useTranslations("DocPage");
  return (
    <div className="flex items-center">
      <CopyPageButton
        className="rounded-r-none border-r-0 text-xs"
        locale={locale}
        slug={slug}
      />
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              className={cn(
                "h-8 rounded-l-none border-l data-[popup-open]:[&_svg]:rotate-180 max-md:[&_svg]:rotate-180 max-md:data-[popup-open]:[&_svg]:rotate-0",
              )}
              size="sm"
              variant="glow"
            >
              <ChevronDownIcon className="size-3.5 transition-transform" />
            </Button>
          }
        />
        <DropdownMenuContent
          className={cn(
            "w-42 bg-background/40 backdrop-blur-md -translate-x-28",
            locale === "cn" && "-translate-x-25",
          )}
        >
          {Object.entries(menuItems).map(([key, value]) => (
            <DropdownMenuItem
              className="text-[13px]"
              key={key}
              render={value(url, t(`docActions.${key}`))}
            />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
