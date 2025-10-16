import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // poweredByHeader: false,
  // compress: true,
  // reactStrictMode: true,
  // productionBrowserSourceMaps: false,
  // experimental: {
  //   optimizePackageImports: [
  //     "lucide-react",
  //     "@radix-ui/react-slot",
  //     "class-variance-authority",
  //     "clsx",
  //     "tailwind-merge",
  //   ],
  // },
  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)",
  //       headers: [
  //         {
  //           key: "X-Content-Type-Options",
  //           value: "nosniff",
  //         },
  //         {
  //           key: "X-Frame-Options",
  //           value: "DENY",
  //         },
  //         {
  //           key: "X-XSS-Protection",
  //           value: "1; mode=block",
  //         },
  //         {
  //           key: "Referrer-Policy",
  //           value: "strict-origin-when-cross-origin",
  //         },
  //         {
  //           key: "Permissions-Policy",
  //           value: "camera=(), microphone=(), geolocation=()",
  //         },
  //       ],
  //     },
  //     {
  //       source: "/_next/static/(.*)",
  //       headers: [
  //         {
  //           key: "Cache-Control",
  //           value: "public, max-age=31536000, immutable",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
