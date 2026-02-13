"use client";

import { LanguagesIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useTransition } from "react";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/ui/button";
import {
  Select,
  SelectContent,
  SelectItemContent,
  SelectTrigger,
} from "@/registry/ui/select";

const languages = [
  { label: "English", value: "en" },
  { label: "中文", value: "cn" },
];

export function LanguageSelector() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const [value, setValue] = useState(params.locale as string);
  return (
    <Select
      disabled={isPending}
      items={languages}
      onValueChange={(value) => {
        setValue(value as string);
        startTransition(() => {
          router.replace(
            // @ts-expect-error -- TypeScript will validate that only known params
            // are used in combination with a given pathname. Since the two will
            // always match for the current route, we can skip runtime checks.
            { params, pathname },
            { locale: value },
          );
        });
      }}
      value={value}
    >
      <SelectTrigger
        className={cn(
          buttonVariants({ size: "icon-sm", variant: "glow" }),
          "data-[popup-open]:bg-accent data-[popup-open]:hover:bg-accent",
        )}
      >
        <LanguagesIcon />
      </SelectTrigger>

      <SelectContent
        align="center"
        className="shadow-md shadow-primary/10 outline dark:-outline-offset-1 outline-primary/10 w-20"
      >
        {languages.map((language) => (
          <SelectItemContent
            className="text-xs font-medium"
            disabled={language.value === value}
            indicatorIcon={null}
            key={language.value}
            value={language.value}
          >
            {language.label}
          </SelectItemContent>
        ))}
      </SelectContent>
    </Select>
  );
}
