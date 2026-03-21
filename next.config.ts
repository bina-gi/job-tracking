import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  productionBrowserSourceMaps: false,

  experimental: {
    preloadEntriesOnStart: false,
    webpackBuildWorker: true,
    serverSourceMaps: false,
  },
};

export default nextConfig;
