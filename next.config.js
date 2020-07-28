const withMDX = require('@next/mdx')();

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  rewrites: () => [
    {
      destination: '/api/ads',
      source: '/ads.txt',
    },
  ],
};

module.exports = withMDX(nextConfig);
