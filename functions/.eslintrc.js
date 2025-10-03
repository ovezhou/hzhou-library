module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  extends: ['eslint:recommended', 'google'],
  rules: {
    'no-restricted-globals': ['error', 'name', 'length'],
    'prefer-arrow-callback': 'error',
    quotes: ['error', 'double', { allowTemplateLiterals: true }],
  },
  overrides: [
    {
      files: ['**/*.spec.*'],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
}

// /* functions/.eslintrc.js */
// module.exports = {
//   root: true,
//   env: {
//     node: true,
//     es2020: true,
//   },
//   parserOptions: {
//     ecmaVersion: 2020,
//     sourceType: 'script',
//   },
//   extends: ['eslint:recommended', 'google'],
//   rules: {
//     'no-restricted-globals': ['error', 'name', 'length'],
//     'prefer-arrow-callback': 'error',
//     quotes: ['error', 'double', { allowTemplateLiterals: true }],
//     'no-unused-vars': 'off',
//   },

//   ignorePatterns: ['.eslintrc.js', 'node_modules/'],
//   overrides: [
//     {
//       files: ['**/*.spec.*'],
//       env: { mocha: true },
//     },
//   ],
// }
