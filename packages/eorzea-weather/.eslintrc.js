module.exports = {
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        jest: true,
      },
      files: ['**/__tests__/**/*.js'],
    },
  ],
  root: false,
};
