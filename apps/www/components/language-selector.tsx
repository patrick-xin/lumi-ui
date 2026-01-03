"use client";

import { LanguagesIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useTransition } from "react";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import {
  Select,
  SelectContent,
  SelectItemContent,
  SelectTrigger,
} from "@/registry/ui/select";
import { cn } from "../lib/utils";
import { buttonVariants } from "../registry/ui/button";

const languages = [
  { value: "en", label: "English" },
  { value: "cn", label: "中文" },
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
      value={value}
      onValueChange={(value) => {
        setValue(value as string);
        startTransition(() => {
          router.replace(
            // @ts-expect-error -- TypeScript will validate that only known params
            // are used in combination with a given pathname. Since the two will
            // always match for the current route, we can skip runtime checks.
            { pathname, params },
            { locale: value },
          );
        });
      }}
    >
      <SelectTrigger
        className={cn(buttonVariants({ variant: "glow", size: "icon-sm" }))}
      >
        <LanguagesIcon />
      </SelectTrigger>

      <SelectContent
        align="center"
        className="shadow-md shadow-primary/10 outline dark:-outline-offset-1 outline-primary/10 w-20"
      >
        {languages.map((language) => (
          <SelectItemContent
            disabled={language.value === value}
            key={language.value}
            value={language.value}
            indicatorIcon={null}
            className="text-xs font-medium text-primary"
          >
            {language.label}
          </SelectItemContent>
        ))}
      </SelectContent>
    </Select>
  );
}
