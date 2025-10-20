// source.config.ts
import {
  defineConfig,
  defineDocs,
  frontmatterSchema
} from "fumadocs-mdx/config";
import rehypePrettyCode from "rehype-pretty-code";
import { z } from "zod";

// lib/highlight-code.ts
import { highlight } from "fumadocs-core/highlight";
var transformers = [
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
            "yarn create "
          );
          node.properties["__pnpm__"] = raw.replace(
            "npx create-",
            "pnpm create "
          );
          node.properties["__bun__"] = raw.replace("npx", "bunx --bun");
        }
        if (raw.startsWith("npm create")) {
          node.properties["__npm__"] = raw;
          node.properties["__yarn__"] = raw.replace(
            "npm create",
            "yarn create"
          );
          node.properties["__pnpm__"] = raw.replace(
            "npm create",
            "pnpm create"
          );
          node.properties["__bun__"] = raw.replace("npm create", "bun create");
        }
        if (raw.startsWith("npx")) {
          node.properties["__npm__"] = raw;
          node.properties["__yarn__"] = raw.replace("npx", "yarn");
          node.properties["__pnpm__"] = raw.replace("npx", "pnpm dlx");
          node.properties["__bun__"] = raw.replace("npx", "bunx --bun");
        }
        if (raw.startsWith("npm run")) {
          node.properties["__npm__"] = raw;
          node.properties["__yarn__"] = raw.replace("npm run", "yarn");
          node.properties["__pnpm__"] = raw.replace("npm run", "pnpm");
          node.properties["__bun__"] = raw.replace("npm run", "bun");
        }
      }
    }
  }
];

// source.config.ts
var source_config_default = defineConfig({
  mdxOptions: {
    rehypePlugins: (plugins) => {
      plugins.shift();
      plugins.push([
        () => rehypePrettyCode({
          theme: {
            dark: "catppuccin-frappe",
            light: "catppuccin-latte"
          },
          transformers
        })
      ]);
      return plugins;
    }
  }
});
var docs = defineDocs({
  dir: "content/docs",
  docs: {
    postprocess: {
      includeProcessedMarkdown: true
    },
    schema: frontmatterSchema.extend({
      links: z.object({
        doc: z.string().optional(),
        api: z.string().optional()
      }).optional(),
      status: z.enum(["planned", "in-progress", "new"]).optional()
    })
  }
});
export {
  source_config_default as default,
  docs
};
