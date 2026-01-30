import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { cn } from "@/registry/lib/utils";

function Avatar({ className, ...props }: BaseAvatar.Root.Props) {
  return (
    <BaseAvatar.Root
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full select-none",
        className,
      )}
      data-slot="avatar"
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: BaseAvatar.Image.Props) {
  return (
    <BaseAvatar.Image
      className={cn("aspect-square size-full object-cover", className)}
      data-slot="avatar-image"
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: BaseAvatar.Fallback.Props) {
  return (
    <BaseAvatar.Fallback
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className,
      )}
      data-slot="avatar-fallback"
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
