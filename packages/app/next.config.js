const withMDX = require('@next/mdx')();

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  i18n: {
    defaultLocale: 'ja',
    localeDetection: false,
    locales: ['en', 'ja'],
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
  rewrites: () => [
    {
      destination: '/api/ads',
      source: '/ads.txt',
    },
  ],
};

module.exports = withMDX(nextConfig);
