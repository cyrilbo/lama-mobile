// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const tanstackConfig = require("@tanstack/eslint-plugin-query");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const testingLibrary = require("eslint-plugin-testing-library");

module.exports = defineConfig([
  expoConfig,
  tanstackConfig.configs["flat/recommended"],
  testingLibrary.configs["flat/react"],
  eslintPluginPrettierRecommended,
  {
    ignores: ["dist/*", "expo-env.d.ts"],
  },
]);
