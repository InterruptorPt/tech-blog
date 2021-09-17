const fs = require('fs')
const tsconfig = require('./tsconfig.json')

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:jsx-a11y/recommended',
    'plugin:import/typescript',
    'plugin:@next/next/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [
    'import',
    'jsx-a11y',
    'react',
    'react-hooks',
    'testing-library',
    'simple-import-sort',
    'tailwindcss',
  ],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: ['./tsconfig.json'],
  },
  rules: {
    curly: ['error', 'multi-line', 'consistent'],
    'import/first': 'error',
    'import/no-duplicates': 'error',
    'jsx-a11y/media-has-caption': 'off',
    'object-shorthand': 'error',
    'prefer-const': ['error', { destructuring: 'all' }],
    'prettier/prettier': ['error', require('./.prettierrc.json')],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react/sort-comp': [
      'error',
      {
        order: [
          'type-annotations',
          'static-methods',
          'instance-variables',
          'lifecycle',
          'everything-else',
          'rendering',
        ],
        groups: {
          rendering: ['/^render.+$/', 'render'],
        },
      },
    ],
    'react/jsx-curly-brace-presence': ['error', 'never'],
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Packages. `react` and `next` related packages come first.
          ['^react', '^next', '^@?\\w'],
          // src folders
          [
            `^(${fs
              .readdirSync(tsconfig.compilerOptions.baseUrl)
              .join('|')})(/.*|$)`,
          ],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.s?css$'],
        ],
      },
    ],
    'tailwindcss/classnames-order': 'error',
    'tailwindcss/no-custom-classname': [
      'error',
      { whitelist: ['chunky\\-underline\\-(violet|lime)\\-\\d{3}'] },
    ],

    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: true, argsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      'warn',
      { accessibility: 'no-public' },
    ],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
    '@typescript-eslint/no-misused-promises': 'error',
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx'],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
}
