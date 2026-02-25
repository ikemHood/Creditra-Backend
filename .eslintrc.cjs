/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // NOTE: 'recommended-requiring-type-checking' intentionally omitted —
    // type-checked rules (no-unsafe-*) will be introduced in a follow-up
    // issue once existing source files are brought up to baseline.
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',         // warn only, not error
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-console': 'off',                                  // off — existing code uses console.log
  },
  ignorePatterns: ['dist/', 'node_modules/', 'coverage/', '*.cjs', '*.js'],
};