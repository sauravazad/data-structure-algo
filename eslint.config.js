import stylistic from '@stylistic/eslint-plugin'
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.js"],
    plugins: {
      js,
      '@stylistic': stylistic
    },
    extends: ["js/recommended"],
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/max-len': ['error', 2],
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
    languageOptions: {
      globals: {
        ...globals.nodeBuiltin,
        ...globals.node,
        ...globals.builtin
      }
    }
  },
]);
