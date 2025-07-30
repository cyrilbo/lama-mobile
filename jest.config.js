// @ts-check

/**
 * Code in the react-native ecosystem if often shipped untransformed, with flow or typescript in files
 * App code also needs to be transformed (it's TypeScript), but the rest of node_modules doesn't need to.
 * Transforming the minimum amount of code makes tests run much faster
 *
 * If encountering a syntax error during tests with a new package, add it to this list
 */
const packagesToTransform = [
  "react-error-boundary",
  "react-native",
  "react-native-(.*)",
  "@react-native",
  "@react-native-community",
  "@react-navigation",
  "expo",
  "expo-(.*)",
];

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  /*
   * What the preset provides:
   * - a transformer to handle media assets (png, video)
   * - lots of mocks for react-native and expo modules
   */
  preset: "jest-expo",
  // test environment setup
  setupFiles: [
    "./src/testing/jest-setup.ts",
    "react-native-unistyles/mocks",
    "./src/shared/view/ui-kit/theme/unistyles.ts",
  ],
  setupFilesAfterEnv: ["./src/testing/jest-setupAfterEnv.ts"],
  globalSetup: "./src/testing/jest-globalSetup.ts",
  clearMocks: true,
  // module resolution
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testRegex: "\\.test\\.[jt]sx?$",
  transformIgnorePatterns: [
    `node_modules/(?!(${packagesToTransform.join("|")})/)`,
  ],
  cacheDirectory: ".cache/jest",
  // coverage
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
  coveragePathIgnorePatterns: ["/node_modules/"],
  // tools
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  reporters: ["default", "github-actions"],
};

module.exports = config;
