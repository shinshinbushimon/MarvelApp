/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ["./jest.setup.ts", 'jest-fetch-mock'],
  testMatch: [
    "**/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
  ],
  testPathIgnorePatterns: [
    "/node_modules/"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  moduleNameMapper: {
    '^RecoilAtom$': '<rootDir>/RecoilAtom.ts',
    '^customHooks$': '<rootDir>/customHooks.ts',
  },
};