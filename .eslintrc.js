module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  // next/core-web-vitals already provides the react, react-hooks and import plugins
  // (plus a TS parser for type checking). Re-declaring react/react-hooks here caused
  // "Plugin X was conflicted between two paths" and aborted ESLint entirely, so we
  // rely on next's bundled config and only layer our custom rules + prettier on top.
  extends: ['next/core-web-vitals', 'prettier'],
  // @typescript-eslint is NOT bundled by eslint-config-next@13's core-web-vitals,
  // so we add it here (single source → no conflict) to enable the custom TS rules.
  plugins: ['@typescript-eslint'],
  settings: {
    'import/resolver': {
      typescript: {},
      node: {},
    },
  },
  rules: {
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'never',
      },
    ],
  },
  overrides: [
    {
      // Type-aware rules only run on TS files with the TS parser + tsconfig project.
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaFeatures: { jsx: true },
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'warn',
        '@typescript-eslint/naming-convention': [
          'error',
          { format: ['camelCase', 'PascalCase'], selector: 'function' },
          { format: ['PascalCase'], selector: 'interface' },
          { format: ['PascalCase'], selector: 'typeAlias' },
        ],
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            ignoreRestSiblings: true,
          },
        ],
      },
    },
  ],
};
