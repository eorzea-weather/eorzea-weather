const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: [
      'components',
      'constants',
      'context',
      'intl',
      'pages',
      'types',
      'utils',
    ],
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
