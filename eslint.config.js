import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.git/**',
      '**/.vscode/**',
      'prisma/**',
      'generated/**',
      '**/prisma/**',
      '**/generated/**',
      '**/ui/**',
      '**/lib/**',
    ],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettierConfig],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': 'warn',
      semi: 'off',
      '@typescript-eslint/semi': 'off',
      'prettier/prettier': [
        'error',
        {
          semi: false,
          tabWidth: 2,
          printWidth: 100,
          singleQuote: true,
          trailingComma: 'es5',
          jsxBracketSameLine: false,
          arrowParens: 'avoid',
        },
      ],
    },
  }
)
