import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { CopyButton } from "@/components/docs/copy-button";
import { CodeTabs } from "@/components/docs/mdx/code-tabs";
import { ComponentPreview } from "@/components/docs/mdx/component-preview";
import { ComponentSourceCode } from "@/components/docs/mdx/component-source-code";
import { InstallationCommand } from "@/components/docs/mdx/installation-command";
import { Step, Steps } from "@/components/docs/mdx/steps";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/ui/tabs";
import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from "./components/docs/mdx/tables";

export const mdxComponents: MDXComponents = {
  p: ({ className, ...props }: React.ComponentProps<"p">) => (
    <p
      className={cn("leading-relaxed [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  h1: ({ children, className, ...props }: React.ComponentProps<"h1">) => (
    <h1
      className={cn(
        "mt-0 mb-8 scroll-m-20",
        "text-3xl font-extrabold leading-tight tracking-tight",
        "text-foreground pb-4",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, className, ...props }: React.ComponentProps<"h2">) => (
    <h2
      className={cn(
        "group mt-12 mb-6 first:mt-0 scroll-m-32 lg:scroll-m-20",
        "text-2xl font-bold leading-tight tracking-tight",
        "pb-2",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, className, ...props }: React.ComponentProps<"h3">) => (
    <h3
      className={cn(
        "group mt-8 mb-4 first:mt-0 scroll-mt-32 lg:scroll-m-20",
        "text-xl font-semibold leading-snug tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, className, ...props }: React.ComponentProps<"h4">) => (
    <h4
      className={cn(
        "mt-6 mb-2 first:mt-0 scroll-mt-32 lg:scroll-m-20",
        "text-lg font-semibold leading-snug tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </h4>
  ),
  h5: ({ children, className, ...props }: React.ComponentProps<"h5">) => (
    <h5
      className={cn(
        "mt-5 mb-2 first:mt-0 scroll-mt-32 lg:scroll-m-20",
        "text-lg font-semibold leading-normal tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </h5>
  ),
  h6: ({ children, className, ...props }: React.ComponentProps<"h6">) => (
    <h6
      className={cn(
        "mt-5 mb-2 first:mt-0 scroll-mt-32 lg:scroll-m-20",
        "text-base font-semibold leading-normal tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </h6>
  ),
  strong: ({ className, ...props }: React.ComponentProps<"strong">) => (
    <strong className={cn("font-medium", className)} {...props} />
  ),
  ul: ({ className, ...props }: React.ComponentProps<"ul">) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.ComponentProps<"ol">) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.ComponentProps<"li">) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  ),
  hr: ({ ...props }: React.ComponentProps<"hr">) => (
    <hr className="my-4 md:my-8" {...props} />
  ),
  a: ({ ...props }): React.AnchorHTMLAttributes<HTMLAnchorElement> => {
    if (props.href.startsWith("https")) {
      return (
        <a
          className="relative inline-block font-medium text-primary underline underline-offset-4 transition-colors ease-linear"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      );
    }

    return <Link href={props.href}>{props.children}</Link>;
  },
  figure: ({ className, ...props }: React.ComponentProps<"figure">) => {
    return (
      <figure
        className={cn(
          "[&:not(:first-child)]:mt-4 max-h-[550px] overflow-y-auto no-scrollbar",
          className,
        )}
        {...props}
      />
    );
  },
  figcaption: ({
    className,
    children,
    ...props
  }: React.ComponentProps<"figcaption">) => {
    return (
      <figcaption
        className={cn(
          "text-code-foreground flex items-center gap-2",
          className,
        )}
        {...props}
      >
        {children}
      </figcaption>
    );
  },
  pre: ({ className, children, ...props }: React.ComponentProps<"pre">) => {
    return (
      <pre
        className={cn(
          "no-scrollbar min-w-0 overflow-x-auto py-3 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0",
          className,
        )}
        {...props}
      >
        {children}
      </pre>
    );
  },
  code: ({
    className,
    __raw__,
    __npm__,
    __yarn__,
    __pnpm__,
    __src__,
    __bun__,
    ...props
  }: React.ComponentProps<"code"> & {
    __raw__?: string;
    __src__?: string;
    __npm__?: string;
    __yarn__?: string;
    __pnpm__?: string;
    __bun__?: string;
  }) => {
    if (typeof props.children === "string") {
      return (
        <code
          className={cn(
            "bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-[0.8rem] break-words outline-none",
            className,
          )}
          {...props}
        />
      );
    }

    const isNpmCommand = __npm__ && __yarn__ && __pnpm__ && __bun__;
    if (isNpmCommand) {
      return (
        <InstallationCommand
          __raw__={__raw__}
          __npm__={__npm__}
          __yarn__={__yarn__}
          __pnpm__={__pnpm__}
          __bun__={__bun__}
        />
      );
    }

    return (
      <>
        {__raw__ && (
          <CopyButton
            className="absolute top-1.5 right-2 z-10"
            code={__raw__}
          />
        )}
        <code {...props} />
      </>
    );
  },
  Step,
  Steps,
  CodeTabs,
  TabsList,
  TabsTab,
  TabsPanel,
  table: Table,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,
  ComponentPreview,
  ComponentSourceCode,
  Tabs,
};
