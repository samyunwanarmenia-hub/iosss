import path from 'path'; // Import the path module

const isCapacitor = process.env.CAPACITOR === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: false,
  assetPrefix: isCapacitor ? '/' : undefined, // Capacitor uses capacitor://localhost so root-relative paths work
  images: {
    // Use the built-in optimizer to ship smaller, modern formats
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
    unoptimized: isCapacitor,
  },
  webpack: (config, { isServer }) => {
    // Ensure 'punycode' resolves to the npm package for both client and server
    // This is a common fix for the DeprecationWarning.
    // Using path.join and process.cwd() for ES module compatibility.
    config.resolve.alias = {
      ...config.resolve.alias,
      punycode: path.join(process.cwd(), 'node_modules', 'punycode'),
    };
    return config;
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'samyunwanarmenia.netlify.app' }],
        destination: 'https://samyun-wan.life/:path*',
        permanent: true,
      },
      {
        source: '/samyun-wan-armenia.html',
        destination: '/hy',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Link',
            value: [
              '<https://www.google.com>; rel=preconnect; crossorigin=anonymous',
              '<https://www.googletagmanager.com>; rel=preconnect; crossorigin=anonymous',
              '<https://stats.g.doubleclick.net>; rel=preconnect; crossorigin=anonymous',
              '<https://googleads.g.doubleclick.net>; rel=preconnect; crossorigin=anonymous',
              '<https://analytics.google.com>; rel=preconnect; crossorigin=anonymous',
            ].join(', '),
          },
        ],
      },
    ];
  },
  // Add other configurations as needed
};

export default nextConfig;
