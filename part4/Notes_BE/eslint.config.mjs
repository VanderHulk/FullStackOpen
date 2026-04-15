import globals from 'globals'
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin'

export default [
  // ensures that ESLint's recommended settings are applied first before our own custom options
  js.configs.recommended,
  {
     ignores: ['node_modules/**', 'dist/**'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
      ecmaVersion: 'latest',
    },    

    // this is where you can extend ESLint's functionality by adding CUSTOM RULES, CONFIGURATIONS and CAPABILITIES that are not available in the core ESLint library
    plugins: {
      '@stylistic/js': stylisticJs,
    },

    // adds JS stylistic rules for ESLint
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
    },
  },
]