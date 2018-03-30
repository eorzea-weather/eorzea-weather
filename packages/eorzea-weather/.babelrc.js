const env = process.env.NODE_ENV || 'development';

module.exports = {
  presets: [
    ['@babel/env', { modules: env === 'test' ? 'commonjs' : false }],
  ],
};
