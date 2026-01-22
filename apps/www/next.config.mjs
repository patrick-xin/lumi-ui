import { createMDX } from "fumadocs-mdx/next";
import createNextIntlPlugin from "next-intl/plugin";

const withMDX = createMDX({});

/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
        protocol: "https",
      },
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
      {
        hostname: "avatar.vercel.sh",
        protocol: "https",
      },
    ],
  },
  reactCompiler: true,
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        destination: "/llms/:locale/:path*",
        source: "/:locale/docs/:path*.md",
      },
      {
        destination: "/llms/:path*",
        source: "/docs/:path*.md",
      },
    ];
  },
  transpilePackages: ["@lumi-ui/ui"],
};

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

export default withNextIntl(withMDX(config));
