import Link from "next/link";
import { Logo } from "@/components/logo";

function NotFound() {
  return (
    <main className="h-screen">
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto h-screen flex justify-center items-center">
          <div className="space-y-4 xl:space-y-10">
            <Logo className="size-12" />
            <div>
              <h1 className="text-4xl xl:text-6xl font-bold">
                Opps, Page not found
              </h1>
              <p className="text-muted-foreground text-lg mt-6">
                Sorry, we couldn't find the page you're looking for. Here are
                some helpful links instead:
              </p>
            </div>

            <div className="flex gap-4">
              <Link
                href="/docs/installation"
                className="bg-accent/90 transition-colors hover:bg-accent inline-block py-2 px-4 rounded-md"
              >
                Get Started
              </Link>
              <Link
                href="/docs/components"
                className="border-border border transition-colors inline-block py-1.5 px-4 rounded-md"
              >
                Browser components
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
