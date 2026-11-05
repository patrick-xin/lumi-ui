import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/",
    "/(cn|en)/:path*",
    "/((?!api|llms|sitemap|r|_next/static|_next/image|_next/.*|images|favicon.ico|site\\.webmanifest|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg).*)",
  ],
};
