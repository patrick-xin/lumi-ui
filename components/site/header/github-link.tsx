import Link from "next/link";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/lib/config";
import { Button } from "@/registry/ui/button";

export function GitHubLink() {
  return (
    <Button
      nativeButton={false}
      render={
        <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
          <Icons.gitHub />
        </Link>
      }
      size="sm"
      variant="outline"
      className="h-8 shadow-none"
    />
  );
}
