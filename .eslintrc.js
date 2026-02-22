module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:playwright/playwright-test'
  ],
  plugins: ['@typescript-eslint', 'prettier', 'jest', 'import', 'typescript-sort-keys'],
  env: {
    browser: true,
    es2021: true
  },
  parserOptions: {
    ecmaVersion: 12,
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  rules: {
    'no-console': 0,
    'no-irregular-whitespace': 'off',
    'no-nested-ternary': 'off',
    'playwright/expect-expect': 'off',
    'playwright/no-conditional-in-test': 'off',
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    'no-shadow': ['off'],
    '@typescript-eslint/no-shadow': ['off'],
    radix: ['off'],
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'no-empty-pattern': ['off'],
    'class-methods-use-this': ['off'],
    'no-param-reassign': ['off'],
    'no-return-assign': ['off'],
    '@typescript-eslint/no-loop-func': ['off'],
    'no-underscore-dangle': ['off', { allowAfterThis: true }],
    'no-await-in-loop': 'off',
    'no-loop-func': 'off',
    'func-call-spacing': ['error'],
    'playwright/no-page-pause': ['error'],
    'playwright/missing-playwright-await': ['error'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'max-len': [
      'error',
      {
        ignoreStrings: true,
        ignoreUrls: true,
        code: 160,
        ignoreTemplateLiterals: true
      }
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false
      }
    ],
    'import/no-anonymous-default-export': ['error'],
    'import/order': [
      'error',
      {
        'newlines-between': 'always-and-inside-groups'
      }
    ],
    'import/no-useless-path-segments': [
      'error',
      {
        noUselessIndex: true
      }
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        jsxSingleQuote: false,
        semi: true,
        tabWidth: 2,
        bracketSpacing: true,
        jsxBracketSameLine: false,
        arrowParens: 'always',
        trailingComma: 'all',
        endOfLine: 'auto'
      }
    ],
    '@typescript-eslint/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'typescript-sort-keys/string-enum': 'error',
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/no-floating-promises": "error",
    '@typescript-eslint/naming-convention': [
      "error",
      {
        "selector": "function",
        "format": ["camelCase", "PascalCase"]
      },
      {
        "selector": "function",
        "filter": "^[A-Za-z]+_[0-9]+$",
        "format": null
      }
    ]
  },
  root: true
};
