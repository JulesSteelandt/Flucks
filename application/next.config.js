/** @type {import('next').NextConfig} */
const nextConfig = {
  // Existing configurations
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'docketu.iutnc.univ-lorraine.fr',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
