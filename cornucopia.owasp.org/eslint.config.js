import love from 'eslint-config-love'

export default [
  {
    ...love,
    files: ['src/**/*.ts'],
    rules: {
      ...love.rules,
      // Disabled: requires full TypeScript rewrite of codebase
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-type-assertion': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    }
  }
]