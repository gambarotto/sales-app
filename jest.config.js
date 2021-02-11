module.exports = {
  bail: true,

  clearMocks: true,

  moduleFileExtensions: ['js'],

  testEnvironment: 'node',

  //testMatch: ['**/__tests__/**/*.test.js?(x)'],

  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.mjs$': 'babel-jest',
  },
  testRegex: '((\\.|/*.)(test))\\.js?$',
};
