import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
// eslint.config.js
export default [
  {
    rules: {
      "no-unused-vars": ["error", { "varsIgnorePattern": "^React$" }],
      "@typescript-eslint/no-unused-vars": ["error", { "varsIgnorePattern": "^React$" }]
    }
  }
];
