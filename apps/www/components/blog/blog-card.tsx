import { Waypoints } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  src: string;
  title: string;
  publishDate: string;
  category: string;
  className?: string;
}

export default function BlogCard({
  src,
  title,
  publishDate,
  category,
  className,
}: BlogCardProps) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(publishDate));

  return (
    <div
      className={cn(
        "group relative flex w-full flex-col overflow-hidden rounded shadow-md shadow-primary/10 outline dark:-outline-offset-2 outline-primary/10",
        className,
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="bg-card group-hover:bg-accent/40 transition-colors flex flex-1 flex-col justify-between p-6 sm:p-7">
        <div className="space-y-3">
          <time className="block text-xs font-medium text-muted-foreground">
            {formattedDate}
          </time>
          <h3 className="text-xl font-medium leading-[1.15] tracking-tight lg:text-2xl">
            {title}
          </h3>
        </div>
        <div className="mt-8 flex items-center gap-2">
          <Waypoints className="size-4" />
          <span className="text-sm font-medium">{category}</span>
        </div>
      </div>
    </div>
  );
}
