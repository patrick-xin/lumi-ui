import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar";

export function AvatarDemo() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-12">
      <Avatar>
        <AvatarImage alt="Lumi UI" src="/images/lumi.png" />
        <AvatarFallback>Lumi UI</AvatarFallback>
      </Avatar>
      <Avatar className="rounded-lg">
        <AvatarImage
          alt="@patrick-xin"
          src="https://github.com/patrick-xin.png"
        />
        <AvatarFallback>Patrick</AvatarFallback>
      </Avatar>
    </div>
  );
}
