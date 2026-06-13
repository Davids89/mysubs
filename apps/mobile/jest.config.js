module.exports = {
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^@mysubs/ui-components$":
      "<rootDir>/../../packages/ui-components/src/index.ts",
  },
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
  testMatch: ["<rootDir>/src/**/*.test.ts?(x)"],
};
