import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Prevent jose from being analyzed for Edge Runtime compatibility.
  // jose's JWE sub-modules use CompressionStream (Node.js only) but we only
  // use jwtVerify / SignJWT which are fully Edge-compatible.
  serverExternalPackages: ['mysql2'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      }
    ],
  },
};

export default nextConfig;
