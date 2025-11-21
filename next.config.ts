import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    cacheComponents: true,
  } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
};

export default nextConfig;
