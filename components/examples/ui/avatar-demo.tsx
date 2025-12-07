import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar";

export function AvatarDemo() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-12">
      <Avatar>
        <AvatarImage src="/images/lumi.png" alt="Lumi UI" />
        <AvatarFallback>Lumi UI</AvatarFallback>
      </Avatar>
      <Avatar className="rounded-lg">
        <AvatarImage
          src="https://github.com/patrick-xin.png"
          alt="@patrick-xin"
        />
        <AvatarFallback>Patrick</AvatarFallback>
      </Avatar>
    </div>
  );
}
