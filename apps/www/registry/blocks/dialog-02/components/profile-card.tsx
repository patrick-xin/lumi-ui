import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar";
import { Button } from "@/registry/ui/button";
import {
  PreviewCard,
  PreviewCardContent,
  PreviewCardTrigger,
} from "@/registry/ui/preview-card";

export function ProfileCard() {
  return (
    <PreviewCard>
      <PreviewCardTrigger
        delay={300}
        render={
          <Button className="cursor-pointer" variant="unstyled">
            <Avatar>
              <AvatarImage src="https://github.com/mui.png" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
          </Button>
        }
      />
      <PreviewCardContent align="start" className="w-80">
        <div className="flex justify-between gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/mui.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@base-ui</h4>
            <p className="text-sm">
              Unstyled UI components for building accessible web apps and design
              systems. From the creators of Radix, Floating UI, and Material UI.
            </p>
            <div className="text-muted-foreground text-xs">
              Joined December 2021
            </div>
          </div>
        </div>
      </PreviewCardContent>
    </PreviewCard>
  );
}
