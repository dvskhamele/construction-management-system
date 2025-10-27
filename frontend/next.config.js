/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable pages directory to prevent conflicts with app router
  experimental: {
    appDir: true,
  },
  // Standard Next.js configuration for Vercel deployment
  images: {
    unoptimized: false, // Let Vercel optimize images
  },
  env: {
    // Environment variables will be handled by Vercel
  },
  // Internationalization configuration for Indian languages
  i18n: {
    locales: [
      'en',    // English
      'hi',    // Hindi
      'bn',    // Bengali
      'te',    // Telugu
      'mr',    // Marathi
      'ta',    // Tamil
      'gu',    // Gujarati
      'kn',    // Kannada
      'ml',    // Malayalam
      'pa',    // Punjabi
      'ur',    // Urdu
      'or',    // Odia
      'as',    // Assamese
      'ne',    // Nepali
      'sd',    // Sindhi
    ],
    defaultLocale: 'en',
  },
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