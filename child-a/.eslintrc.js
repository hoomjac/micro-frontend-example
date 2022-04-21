module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prefer-const': 'error',
    '@typscript-eslint/no-unused-vars': 'off',
    '@typscript-eslint/no-unused-params': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'space-before-function-paren': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-tabs': 'off',
    indent: 'off',
    'comma-dangle': 'off',
    camelcase: ['off', { properties: 'never' }]
  }
}
