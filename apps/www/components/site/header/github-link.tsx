import Link from "next/link";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/lib/config";
import { Button } from "@/registry/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip";

export function GitHubLink({ tooltip = true }: { tooltip?: boolean }) {
  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              className="h-8 shadow-none"
              nativeButton={false}
              render={
                <Link
                  href={siteConfig.links.github}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Icons.gitHub />
                </Link>
              }
              size="icon-sm"
              variant="glow"
            />
          }
        />
        <TooltipContent>GitHub Link</TooltipContent>
      </Tooltip>
    );
  }
  return (
    <Button
      className="h-8 shadow-none"
      nativeButton={false}
      render={
        <Link href={siteConfig.links.github} rel="noreferrer" target="_blank">
          <Icons.gitHub />
        </Link>
      }
      size="icon-sm"
      variant="glow"
    />
  );
}
