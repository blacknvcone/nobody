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
    'plugin:nuxt/recommended',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-console': 'warn',
  },
}
