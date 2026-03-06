import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Production optimizations
  ...(isProd && {
    eslint: { ignoreDuringBuilds: false },
    typescript: { ignoreBuildErrors: false },
  }),

  images: {
    formats: ["image/avif", "image/webp"],
  },

  productionBrowserSourceMaps: false,
  poweredByHeader: false,

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
