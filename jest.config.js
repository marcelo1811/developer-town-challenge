module.exports = {
  testIgnorePatterns: ["/node_modules/", "/dist"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  testEnvironment: "jsdom",
  moduleDirectories: [
    "node_modules",
    "utils", // a utility folder
    __dirname, // the root directory
  ],
};
