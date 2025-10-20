import Link from "next/link";

export function CTACard({
  title,
  description,
  icon,
  href,
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  href?: string;
}) {
  return (
    <>
      {href ? (
        <Link
          href={href}
          className="flex-1 border p-4 md:p-6 flex rounded-md flex-col space-y-6 hover:border-primary transition-colors ease-linear"
        >
          {icon && (
            <span className="inline-block size-4 text-primary">{icon}</span>
          )}
          <div className="space-y-4">
            <div className="text-base font-semibold">{title}</div>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </Link>
      ) : (
        <div className="flex-1 border p-6 flex rounded-md flex-col space-y-6 hover:border-primary transition-colors ease-linear">
          {icon && (
            <span className="inline-block size-4 text-primary">{icon}</span>
          )}
          <div className="space-y-4">
            <div className="text-base font-semibold">{title}</div>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
