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
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    'quote-props': ['error', 'as-needed'],
    'object-curly-spacing': ['error', 'always'],
    'sort-vars': 'error',
    'max-len': ['error', { code: 120 }],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 0 }],
    'arrow-spacing': 'error',
  },
};
