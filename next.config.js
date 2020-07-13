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
  pageExtensions: ['js', 'jsx', 'mdx'],
};

module.exports = withMDX(nextConfig);
