/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standard Next.js configuration for Vercel deployment
  images: {
    unoptimized: false, // Let Vercel optimize images
  },
  env: {
    // Environment variables will be handled by Vercel
  },
  // Use the correct configuration for server external packages
  serverExternalPackages: [],
  // Ensure proper handling of static files
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Set public path for client-side
      config.output.publicPath = 'auto';
    }
    return config;
  }
}

module.exports = nextConfig