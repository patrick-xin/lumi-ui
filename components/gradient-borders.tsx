import { cn } from "@/lib/utils";

interface GradientBordersProps {
  children?: React.ReactNode;
  className?: string;
  colorVar?: string;
  baseOpacity?: number;
  hoverOpacity?: number;
  enableHover?: boolean;
}

export function GradientBorders({
  children,
  className,
  colorVar = "--foreground",
  baseOpacity = 30,
  hoverOpacity = 60,
  enableHover = true,
}: GradientBordersProps) {
  const isDecorationOnly = !children;

  return (
    <div
      className={cn(
        enableHover && "group",
        isDecorationOnly ? "absolute inset-0 pointer-events-none" : "relative",
        className,
      )}
    >
      {/* Top gradient */}
      <div
        className={cn(
          "absolute top-0 inset-x-0 h-px",
          enableHover && "transition-opacity",
        )}
        style={{ opacity: baseOpacity / 100 }}
      >
        <div
          className={cn(
            "h-full w-full",
            enableHover && "group-hover:opacity-100 transition-opacity",
          )}
          style={{
            background: `linear-gradient(to right, transparent, var(${colorVar}), transparent)`,
            opacity: enableHover ? baseOpacity / hoverOpacity : 1,
          }}
        />
      </div>

      {/* Bottom gradient */}
      <div
        className={cn(
          "absolute bottom-0 inset-x-0 h-px",
          enableHover && "transition-opacity",
        )}
        style={{ opacity: baseOpacity / 100 }}
      >
        <div
          className={cn(
            "h-full w-full",
            enableHover && "group-hover:opacity-100 transition-opacity",
          )}
          style={{
            background: `linear-gradient(to right, transparent, var(${colorVar}), transparent)`,
            opacity: enableHover ? baseOpacity / hoverOpacity : 1,
          }}
        />
      </div>

      {/* Left gradient */}
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 w-px",
          enableHover && "transition-opacity",
        )}
        style={{ opacity: baseOpacity / 100 }}
      >
        <div
          className={cn(
            "h-full w-full",
            enableHover && "group-hover:opacity-100 transition-opacity",
          )}
          style={{
            background: `linear-gradient(to bottom, transparent, var(${colorVar}), transparent)`,
            opacity: enableHover ? baseOpacity / hoverOpacity : 1,
          }}
        />
      </div>

      {/* Right gradient */}
      <div
        className={cn(
          "absolute right-0 top-0 bottom-0 w-px",
          enableHover && "transition-opacity",
        )}
        style={{ opacity: baseOpacity / 100 }}
      >
        <div
          className={cn(
            "h-full w-full",
            enableHover && "group-hover:opacity-100 transition-opacity",
          )}
          style={{
            background: `linear-gradient(to bottom, transparent, var(${colorVar}), transparent)`,
            opacity: enableHover ? baseOpacity / hoverOpacity : 1,
          }}
        />
      </div>

      {children}
    </div>
  );
}
