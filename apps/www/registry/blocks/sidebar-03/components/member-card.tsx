import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/registry/ui/avatar";
import type { TeamMember } from "./team-management";

export const MemberCard = ({
  member,
  className,
}: {
  member: TeamMember;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between space-x-4 p-2",
        className,
      )}
    >
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarFallback>{member.initials}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium leading-none">{member.name}</p>
          <p className="text-sm text-muted-foreground">{member.email}</p>
        </div>
      </div>
    </div>
  );
};
