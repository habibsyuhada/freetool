import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
	compiler: {
    removeConsole: false,
  },
  experimental: {
    serverComponentsExternalPackages: ["puppeteer-core"],
  },
};

export default nextConfig;
