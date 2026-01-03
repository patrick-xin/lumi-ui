import Link from "next/link";
import type React from "react";

interface CardContentProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
}

const CardContent: React.FC<CardContentProps> = ({
  icon,
  title,
  description,
}) => (
  <>
    {icon && (
      <span className="rounded-md bg-accent/50 p-2 text-primary">{icon}</span>
    )}
    <div className="space-y-4">
      <div className="font-semibold text-base">{title}</div>
      {description && (
        <p className="text-muted-foreground text-sm">{description}</p>
      )}
    </div>
  </>
);

export interface CTACardProps extends CardContentProps {
  href?: string;
}

export function CTACard({ title, description, icon, href }: CTACardProps) {
  const className =
    "flex-1 border p-4 md:p-6 flex rounded-md flex-col items-start space-y-6 hover:border-primary/50 transition-colors ease-linear focus-state";

  if (href) {
    return (
      <Link className={className} href={href}>
        <CardContent description={description} icon={icon} title={title} />
      </Link>
    );
  }

  return (
    <div className={className}>
      <CardContent description={description} icon={icon} title={title} />
    </div>
  );
}
