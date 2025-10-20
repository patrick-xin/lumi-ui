import { type HighlightOptions, highlight } from "fumadocs-core/highlight";
import type { ShikiTransformer } from "shiki";

export const transformers = [
  {
    code(node) {
      if (node.tagName === "code") {
        const raw = this.source;
        node.properties["__raw__"] = raw;

        if (raw.startsWith("npm install")) {
          node.properties["__npm__"] = raw;
          node.properties["__yarn__"] = raw.replace("npm install", "yarn add");
          node.properties["__pnpm__"] = raw.replace("npm install", "pnpm add");
          node.properties["__bun__"] = raw.replace("npm install", "bun add");
        }

        if (raw.startsWith("npx create-")) {
          node.properties["__npm__"] = raw;
          node.properties["__yarn__"] = raw.replace(
            "npx create-",
            "yarn create ",
          );
          node.properties["__pnpm__"] = raw.replace(
            "npx create-",
            "pnpm create ",
          );
          node.properties["__bun__"] = raw.replace("npx", "bunx --bun");
        }

        // npm create.
        if (raw.startsWith("npm create")) {
          node.properties["__npm__"] = raw;
          node.properties["__yarn__"] = raw.replace(
            "npm create",
            "yarn create",
          );
          node.properties["__pnpm__"] = raw.replace(
            "npm create",
            "pnpm create",
          );
          node.properties["__bun__"] = raw.replace("npm create", "bun create");
        }

        // npx.
        if (raw.startsWith("npx")) {
          node.properties["__npm__"] = raw;
          node.properties["__yarn__"] = raw.replace("npx", "yarn");
          node.properties["__pnpm__"] = raw.replace("npx", "pnpm dlx");
          node.properties["__bun__"] = raw.replace("npx", "bunx --bun");
        }

        // npm run.
        if (raw.startsWith("npm run")) {
          node.properties["__npm__"] = raw;
          node.properties["__yarn__"] = raw.replace("npm run", "yarn");
          node.properties["__pnpm__"] = raw.replace("npm run", "pnpm");
          node.properties["__bun__"] = raw.replace("npm run", "bun");
        }
      }
    },
  },
] as ShikiTransformer[];

function createHighlightOptions({
  lineNumbers = true,
}: {
  lineNumbers?: boolean;
} = {}): Partial<HighlightOptions> {
  return {
    themes: {
      dark: "catppuccin-frappe",
      light: "catppuccin-latte",
    },
    transformers: [
      {
        pre(node) {
          node.properties["class"] =
            "no-scrollbar min-w-0 overflow-x-auto py-3 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 [&_[data-slot=tabs]]:p-0";
        },
        code(node) {
          if (lineNumbers) {
            node.properties["data-line-numbers"] = "";
          } else {
            delete node.properties["data-line-numbers"];
          }
        },
        line(node) {
          node.properties["data-line"] = "";
        },
      },
    ],
  };
}

export async function highlightCode(
  code: string,
  lang: string,
  opts?: { lineNumbers?: boolean },
) {
  const options = createHighlightOptions({ lineNumbers: opts?.lineNumbers });
  return await highlight(code, { lang, ...options });
}
