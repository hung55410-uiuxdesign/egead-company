/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async rewrites() {
    return [
      { source: '/blog', destination: '/insights?category=blog' },
      { source: '/webinars', destination: '/insights?category=webinars' },
      { source: '/announcements', destination: '/insights?category=announcements' },
      { source: '/white-papers', destination: '/insights?category=white-papers' },
      { source: '/articles', destination: '/insights' },
      { source: '/career', destination: '/careers' },
      { source: '/career/:path*', destination: '/careers/:path*' },
      { source: '/partners/:path*', destination: '/partners' },
      { source: '/catalyzer/smartprice', destination: '/smartprice' },
    ];
  },
};

export default nextConfig;
