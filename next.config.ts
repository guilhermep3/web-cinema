import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    
  },
  output: "standalone", // Caso esteja usando deploy em container ou similar
};

export default nextConfig;
