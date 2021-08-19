module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  ignorePatterns: ['**/sw.js', '**/scripts/**/*.js', '**/scripts/*.js'],
  extends: [
    'plugin:nuxt/recommended',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
  ],
  // add your custom rules here
  rules: {
    'no-console': 'warn',
  },
}
