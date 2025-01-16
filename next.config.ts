import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizeCss: false, // Desativa a otimização automática do CSS
  },
  output: "standalone", // Caso esteja usando deploy em container ou similar
};

export default nextConfig;
