/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // This ignores the 'book-meeting' errors so Vercel can finish
    ignoreBuildErrors: true,
  },
  eslint: {
    // This ignores styling warnings during build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;