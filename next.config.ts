import type { NextConfig } from 'next';

interface CustomNextConfig extends NextConfig {
  cacheComponents?: boolean;
}

const nextConfig: CustomNextConfig = {
  reactCompiler: true,
  cacheComponents: true,
};

export default nextConfig;
