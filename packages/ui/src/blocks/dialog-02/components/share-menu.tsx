"use client";

import { Button } from "@lumi-ui/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@lumi-ui/ui/dropdown-menu";
import { useCopyToClipboard } from "@lumi-ui/ui/hooks/use-copy-to-clipboard";
import { toast } from "@lumi-ui/ui/toast";
import {
  FacebookIcon,
  InstagramIcon,
  LinkIcon,
  ShareIcon,
  TwitterIcon,
} from "lucide-react";

export const ShareMenu = () => {
  const { copyToClipboard } = useCopyToClipboard();
  const handleCopy = () => {
    copyToClipboard("https://lumiui.dev");

    toast.success({
      title: "Copied",
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="w-20"
        render={
          <Button variant="outline">
            <ShareIcon className="size-4" /> Share
          </Button>
        }
      />
      <DropdownMenuContent align="end" matchAnchorWidth={false} side="top">
        <DropdownMenuGroup>
          <DropdownMenuGroupLabel>Socials</DropdownMenuGroupLabel>
          <DropdownMenuItem>
            <FacebookIcon className="size-4" /> <span>Facebook</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <TwitterIcon className="size-4" /> <span>Twitter</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <InstagramIcon className="size-4" /> <span>Instagram</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleCopy}>
          <LinkIcon className="size-4" /> Copy link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
