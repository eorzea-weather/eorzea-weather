const withMDX = require('@next/mdx')();

const nextConfig = {
  experimental: {
    i18n: {
      defaultLocale: 'ja',
      locales: ['en', 'ja'],
    },
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
