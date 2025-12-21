import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const Table = ({
  className,
  ...props
}: React.ComponentProps<"table">) => (
  <div className="no-scrollbar my-6 w-full overflow-y-auto rounded-lg border">
    <table
      className={cn(
        "relative w-full overflow-hidden border-none text-sm [&_tbody_tr:last-child]:border-b-0",
        className,
      )}
      {...props}
    />
  </div>
);

export const TableHead = ({ className, ...props }: ComponentProps<"thead">) => (
  <thead className={cn("bg-primary/10 text-left", className)} {...props} />
);

export const TableBody = ({ className, ...props }: ComponentProps<"tbody">) => (
  <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
);

export const TableRow = ({ className, ...props }: ComponentProps<"tr">) => (
  <tr className={cn("border-b", className)} {...props} />
);

export const TableHeader = ({ className, ...props }: ComponentProps<"th">) => (
  <th
    className={cn(
      "px-4 py-2 text-left bg-primary/10 font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
      className,
    )}
    {...props}
  />
);

export const TableCell = ({ className, ...props }: ComponentProps<"td">) => (
  <td
    className={cn(
      "px-4 py-2 text-left  [&[align=center]]:text-center [&[align=right]]:text-right",
      className,
    )}
    {...props}
  />
);
