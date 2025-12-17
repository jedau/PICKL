import eslint from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  // Base ESLint recommended rules
  eslint.configs.recommended,

  // TypeScript ESLint recommended rules
  ...tseslint.configs.recommended,

  // Prettier config to disable conflicting rules
  prettierConfig,

  // TypeScript files WITH type checking (excluding config files)
  {
    files: ['**/*.ts'],
    ignores: ['eslint.config.ts', '*.config.ts', 'scripts/generate-report.ts', 'types/*.d.ts'],
    extends: [...tseslint.configs.recommendedTypeChecked, ...tseslint.configs.stylisticTypeChecked],
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
      'allure-results/**',
      'allure-report/**',
      'test-results/**',
      'playwright-report/**',
      'package-lock.json',
    ],
  },
)
