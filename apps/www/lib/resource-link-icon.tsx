import {
  SiGithub,
  SiShadcnui,
  SiTailwindcss,
} from "@icons-pack/react-simple-icons";
import { Bot, CpuIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ResourceLinkIconVariant = "sidebar" | "command";

const BaseUiIcon = ({ className }: { className?: string }) => {
  return (
    <span className={cn("inline-flex", className)}>
      <svg
        aria-label="Base UI"
        className="size-full"
        fill="currentcolor"
        viewBox="0 0 24 24"
      >
        <title>Base UI</title>
        <path d="M9.5001 7.01537C9.2245 6.99837 9 7.22385 9 7.49999V23C13.4183 23 17 19.4183 17 15C17 10.7497 13.6854 7.27351 9.5001 7.01537Z"></path>
        <path d="M8 9.8V12V23C3.58172 23 0 19.0601 0 14.2V12V1C4.41828 1 8 4.93989 8 9.8Z"></path>
      </svg>
    </span>
  );
};

export function getResourceLinkIcon(
  name: string,
  variant: ResourceLinkIconVariant,
): ReactNode {
  switch (name) {
    case "Skill":
      return (
        <Bot
          className={
            variant === "sidebar"
              ? "mr-1.5 size-4.5 text-primary"
              : "size-4 text-primary"
          }
        />
      );
    case "github":
      return (
        <SiGithub
          className={
            variant === "sidebar"
              ? "mr-1.5 size-4"
              : "size-4 text-muted-foreground"
          }
        />
      );
    case "tailwind css":
      return (
        <SiTailwindcss
          className={
            variant === "sidebar"
              ? "mr-1.5 size-4"
              : "size-4 text-muted-foreground"
          }
        />
      );
    case "shadcn/ui":
      return (
        <SiShadcnui
          className={
            variant === "sidebar"
              ? "mr-2.5 size-3"
              : "size-3 text-muted-foreground"
          }
        />
      );
    case "llms.txt":
      return (
        <CpuIcon
          className={
            variant === "sidebar"
              ? "mr-1.5 size-4"
              : "size-4 text-muted-foreground"
          }
        />
      );
    case "base-ui":
      return (
        <BaseUiIcon
          className={
            variant === "sidebar"
              ? "mr-1 ml-1 size-4"
              : "size-4 text-muted-foreground"
          }
        />
      );
    default:
      return null;
  }
}
