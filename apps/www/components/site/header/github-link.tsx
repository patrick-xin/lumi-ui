import { Button } from "@lumi-ui/ui/button";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/lib/config";

export function GitHubLink() {
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
      title="GitHub Link"
      variant="glow"
    />
  );
}
