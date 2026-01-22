import { Avatar, AvatarFallback, AvatarImage } from "@lumi-ui/ui/avatar";
import { Button } from "@lumi-ui/ui/button";
import {
  PreviewCard,
  PreviewCardContent,
  PreviewCardTrigger,
} from "@lumi-ui/ui/preview-card";

export function ProfileCard() {
  return (
    <PreviewCard>
      <PreviewCardTrigger
        delay={300}
        render={
          <Button className="cursor-pointer" variant="unstyled">
            <Avatar>
              <AvatarImage src="https://github.com/vercel.png" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
          </Button>
        }
      />
      <PreviewCardContent align="start" className="w-80">
        <div className="flex justify-between gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
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
