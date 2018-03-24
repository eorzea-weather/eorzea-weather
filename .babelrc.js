module.exports = {
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/proposal-decorators',
    '@babel/proposal-object-rest-spread',
  ],
  presets: [
    [
      '@babel/env', 
      {
        modules: false,
      },
    ],
    '@babel/react',
  ],
};
