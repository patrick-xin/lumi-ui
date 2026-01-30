import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  defaultLocale: "en",
  localePrefix: "as-needed",
  locales: ["en", "cn"],
});

export type Locale = (typeof routing.locales)[number];
