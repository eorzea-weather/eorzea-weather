const withMDX = require('@next/mdx')();

const nextConfig = {
  experimental: {
    rewrites: () => [
      {
        destination: '/api/ads',
        source: '/ads.txt',
      },
    ],
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
};

module.exports = withMDX(nextConfig);
