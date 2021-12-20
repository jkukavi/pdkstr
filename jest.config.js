/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const { defaults: tsjPreset } = require("ts-jest/presets");

module.exports = {
  preset: "@shelf/jest-mongodb",
  // preset: "ts-jest",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testEnvironment: "node",
  globalSetup: "<rootDir>/src/__test__/setup.ts",
  globalTeardown: "<rootDir>/src/__test__/setup.ts",
  roots: ["<rootDir>/src/"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  passWithNoTests: true,
};
