import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
	compiler: {
    removeConsole: false,
  },
};

export default nextConfig;
