import {
  defineCollections,
  defineConfig,
  defineDocs,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import rehypePrettyCode from "rehype-pretty-code";
import { z } from "zod";
import { npmTransformer } from "@/lib/highlight-code";

export default defineConfig({
  mdxOptions: {
    rehypePlugins: (plugins) => {
      plugins.shift();
      plugins.push([
        () =>
          rehypePrettyCode({
            theme: {
              dark: "catppuccin-frappe",
              light: "catppuccin-latte",
            },
            transformers: [npmTransformer],
          }),
      ]);

      return plugins;
    },
  },
});

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
    schema: frontmatterSchema.extend({
      links: z
        .object({
          api: z.string().optional(),
          doc: z.string().optional(),
        })
        .optional(),
      status: z.enum(["planned", "in-progress", "new"]).optional(),
    }),
  },
});

export const blog = defineCollections({
  dir: "content/blog",
  schema: frontmatterSchema.extend({
    author: z.string(),
    category: z.string(),
    date: z.iso.date().or(z.date()),
    image: z.string(),
  }),
  type: "doc",
});
