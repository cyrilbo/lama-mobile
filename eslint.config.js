// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const tanstackConfig = require("@tanstack/eslint-plugin-query");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = defineConfig([
  expoConfig,
  tanstackConfig.configs["flat/recommended"],
  eslintPluginPrettierRecommended,
  {
    ignores: ["dist/*", "expo-env.d.ts"],
  },
]);
