/** @type {import('next').NextConfig} */
// Reload config for partner route tree update
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
  // Static files in /public are served with "max-age=0, must-revalidate" by default, so every visit re-asks
  // the server about each image and video. Cache them for a day (and serve stale for 30 days while refreshing).
  async headers() {
    const staticAssetCache = [
      { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=2592000' },
    ];
    return [
      { source: '/assets/:path*', headers: staticAssetCache },
      { source: '/images/:path*', headers: staticAssetCache },
    ];
  },
  async redirects() {
    return [
      {
        source: '/smartcommerce',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/speedx',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/smartprice',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/loyalty',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/catalyzer/smartprice',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/products',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/products/:path*',
        destination: '/404',
        permanent: false,
      },
    ];
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
    ];
  },
};

export default nextConfig;
