module.exports = {
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^@mysubs/api-client$": "<rootDir>/../../packages/api-client/src/index.ts",
    "^@mysubs/business-logic$":
      "<rootDir>/../../packages/business-logic/src/index.ts",
    "^@mysubs/shared-types$":
      "<rootDir>/../../packages/shared-types/src/index.ts",
    "^@mysubs/ui-components$":
      "<rootDir>/../../packages/ui-components/src/index.ts",
  },
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
  testMatch: ["<rootDir>/src/**/*.test.ts?(x)"],
};
