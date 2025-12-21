import { cva, type VariantProps } from "class-variance-authority";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

const calloutVariants = cva(
  "relative my-4 flex gap-3 rounded-lg border p-4 text-sm [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        info: "border-blue-500/50 bg-blue-500/10 text-blue-600 dark:text-blue-400 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400",
        warning:
          "border-yellow-500/50 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400",
        destructive:
          "border-destructive/50 bg-destructive/10 text-destructive [&>svg]:text-destructive",
        success:
          "border-green-500/50 bg-green-500/10 text-green-600 dark:text-green-400 [&>svg]:text-green-600 dark:[&>svg]:text-green-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const iconMap: Record<string, LucideIcon> = {
  default: Info,
  info: Info,
  warning: AlertTriangle,
  destructive: AlertCircle,
  success: CheckCircle2,
};

export interface CalloutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calloutVariants> {
  title?: string;
  icon?: LucideIcon;
}

export function Callout({
  className,
  variant = "default",
  title,
  icon,
  children,
  ...props
}: CalloutProps) {
  const Icon = icon ?? iconMap[variant ?? "default"];

  return (
    <div
      role="alert"
      className={cn(calloutVariants({ variant }), className)}
      {...props}
    >
      <Icon className="size-4" />
      <div className="flex flex-col gap-2">
        {title && <div className="font-medium leading-none">{title}</div>}
        {children && (
          <div className="text-sm [&_p]:leading-relaxed text-foreground/80 w-full [&_code]:bg-primary/10">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
