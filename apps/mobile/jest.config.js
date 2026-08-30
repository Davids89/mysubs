module.exports = {
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^@subtrack/api-client$": "<rootDir>/../../packages/api-client/src/index.ts",
    "^@subtrack/shared-types$":
      "<rootDir>/../../packages/shared-types/src/index.ts",
    "^@subtrack/ui-components$":
      "<rootDir>/../../packages/ui-components/src/index.ts",
  },
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
  testMatch: [
    "<rootDir>/app/**/*.test.ts?(x)",
    "<rootDir>/src/**/*.test.ts?(x)",
  ],
};
