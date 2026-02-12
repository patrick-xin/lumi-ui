"use client";

import {
  FacebookIcon,
  InstagramIcon,
  LinkIcon,
  ShareIcon,
  TwitterIcon,
} from "lucide-react";
import { Button } from "@/registry/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";
import { toast } from "@/registry/ui/toast";

export const ShareMenu = () => {
  const handleCopy = () => {
    navigator.clipboard.writeText("https://lumiui.dev");

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
