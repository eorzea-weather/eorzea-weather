const nextConfig = {
  experimental: {
    rewrites: () => [
      {
        destination: '/api/ads',
        source: '/ads.txt',
      },
    ],
  },
};

module.exports = nextConfig;
