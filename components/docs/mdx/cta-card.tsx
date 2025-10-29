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
      <span className="text-primary bg-accent/50 p-2 rounded-md">{icon}</span>
    )}
    <div className="space-y-4">
      <div className="text-base font-semibold">{title}</div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
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
      <Link href={href} className={className}>
        <CardContent title={title} description={description} icon={icon} />
      </Link>
    );
  }

  return (
    <div className={className}>
      <CardContent title={title} description={description} icon={icon} />
    </div>
  );
}
