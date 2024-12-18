const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
};

const newCustomJestConfig = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/lib/singleton.ts'],
  moduleDirectories: ['node_modules', '<rootDir>/'], // Ensure Jest can resolve modules in your project
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/', // Map @/ to the src directory (adjust if your source folder is different)
  },
}

module.exports = createJestConfig(newCustomJestConfig);
