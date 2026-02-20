import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

// Constants for file patterns to ensure consistency
const TS_FILES = ['**/*.ts']
const TS_IGNORES = ['*.config.ts', 'scripts/generate-report.ts', 'types/*.d.ts']

export default [
  // Base ESLint recommended rules
  js.configs.recommended,

  // TypeScript ESLint recommended rules
  ...tseslint.configs.recommended,

  // Prettier config to disable conflicting rules
  prettierConfig,

  // TypeScript files WITH type checking
  ...tseslint.configs.recommendedTypeChecked.map(config => ({
    ...config,
    files: TS_FILES,
    ignores: TS_IGNORES,
  })),
  ...tseslint.configs.stylisticTypeChecked.map(config => ({
    ...config,
    files: TS_FILES,
    ignores: TS_IGNORES,
  })),

  // Custom rules for TypeScript files
  {
    files: TS_FILES,
    ignores: TS_IGNORES,
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
    },
    rules: {
      // TypeScript specific rules
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/restrict-template-expressions': 'warn',

      // General code quality rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn', // Allow debugger for development/debugging
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'linebreak-style': ['error', 'unix'],

      // Complexity limits
      complexity: ['warn', { max: 10 }],
      'max-depth': ['warn', { max: 3 }],
      'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true, skipComments: true }],
      'max-params': ['warn', { max: 4 }],

      // Code smell prevention
      'no-duplicate-imports': 'error',
      'no-return-await': 'off', // Disabled to avoid conflict; use @typescript-eslint/return-await for nuanced handling in try-catch only
      '@typescript-eslint/return-await': ['error', 'in-try-catch'],
      'consistent-return': 'error',
      'no-else-return': ['error', { allowElseIf: false }],
      'no-lonely-if': 'error',
      'no-nested-ternary': 'warn',
      'prefer-template': 'error',

      // Security
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',

      // Test-specific allowances
      '@typescript-eslint/no-non-null-assertion': 'off', // Useful in test assertions
    },
  },

  // Config files - Node.js environment
  {
    files: ['config/**/*.js', 'config/**/*.cjs', 'config/**/*.mjs'],
    languageOptions: {
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
  },

  // Ignore patterns
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '*.js',
      '*.mjs',
      'coverage/**',
      'test-results/**',
      'playwright-report/**',
      'package-lock.json',
    ],
  },
]
