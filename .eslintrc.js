module.exports = {
  root: true,
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'google',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'quote-props': ['error', 'as-needed'],
  },
};
