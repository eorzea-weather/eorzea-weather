module.exports = {
  plugins: [
    ['@babel/proposal-decorators', { legacy: true }],
    ['@babel/proposal-class-properties', { loose: true }],
    '@babel/proposal-object-rest-spread',
  ],
  presets: [
    [
      '@babel/env', 
      {
        corejs: 3,
        modules: false,
        useBuiltIns: 'usage'
      },
    ],
    '@babel/react',
  ],
};
